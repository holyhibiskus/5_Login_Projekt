import {action, computed, observable} from 'mobx';
import config from "../../config/main.config";
import {
    getTokenFromLocalStorage,
    getUserFromLocalStorage,
    removeTokenFromStorage,
    setTokenLocalStorage,
    setUserToLocalStorage
} from "../helper/util";
import history from "../helper/browserHistory"

class UserStore {
    @observable user = null;
    @observable loading = false;
    @observable error = false;

    @computed get userFromServer() {
        if (this.user === null) {
            if (getUserFromLocalStorage() !== null && typeof getUserFromLocalStorage() !== "undefined") {
                this.user = getUserFromLocalStorage();
            }
        }
        return this.user;
    }

    @action getUsers() {
        fetch(config.BASE_URL + "users/getAll", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + getTokenFromLocalStorage()
            }
        }).then(response => {
            this.loading = false;
            if (response.status >= 200 && response.status < 300) {
                response.json().then(json => {
                    this.users = json;
                });

            } else {
                //TODO do something
            }
        }).catch(
            error => {
                this.fetching = false;
                console.log(error);
                if (error.status === 401) {
                    history.replace("/login");
                }
            }
        );
    }

    @action authenticateUser(userToAuthenticate) {
        const token = getTokenFromLocalStorage();
        if (userToAuthenticate === null) {
            alert("Bitte melden Sie sich erneut an.")
        }
        else {
            this.loading = true;
            return fetch(config.BASE_URL + "users/authenticate", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(userToAuthenticate)
            })
                .then(response => {
                    this.loading = false;
                    if (response.status >= 200 && response.status < 300) {
                        response.json().then(json => {
                            setTokenLocalStorage(json.token);
                            setUserToLocalStorage(json);
                            this.user = json;
                        });
                    } else {
                        //TODO: Alert?
                        removeTokenFromStorage();
                        this.error = true;
                        this.user = null;
                    }
                })
                .catch(
                    error => {
                        //TODO: Alert?
                        removeTokenFromStorage();
                        this.loading = false;
                        this.error = true;
                        this.user = null;
                        throw error;
                    }
                );
        }

    }

    @action registerUser(userToRegister) {
        const token = getTokenFromLocalStorage();
        if (userToRegister === null) {
            alert("Bitte melden Sie sich erneut an.")
        }
        else {
            this.loading = true;
            return fetch(config.BASE_URL + "users/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(userToRegister)
            })
                .then(response => {
                    this.loading = false;
                    if (response.status >= 200 && response.status < 300) {
                        response.json().then(json => {
                            setTokenLocalStorage(json.token);
                            setUserToLocalStorage(json);
                            this.user = json;

                        });

                    } else {
                        //TODO: Alert?
                        removeTokenFromStorage();
                        this.error = true;
                        this.user = null;
                    }
                })
                .catch(
                    error => {
                        //TODO: Alert?
                        removeTokenFromStorage();
                        this.loading = false;
                        this.error = true;
                        this.user = null;
                        throw error;
                    }
                );
        }

    }
}

const store = new UserStore();

export default store;