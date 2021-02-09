import { observable, action } from 'mobx';
import config from "../../config/main.config";
import {
    getTokenFromLocalStorage
} from "../helper/util";

class CarsStore {
    @observable selectedCar = {}; 
    @action selectCar(car) {
        this.selectedCar = car; 
    }

    @observable carsFromServer = [];
    @observable error = '';

    constructor() {
        this.baseURL = config.BASE_URL_CARS;
    }


    @action fetchCars() {
        return fetch(this.baseURL+'/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log("get request cars");
                        console.log(json);
                        this.carsFromServer = json.cars;
                    });
                } else {
                    this.error = "Error on fetching";
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }

    @action addNewCar(newCar) {
        return fetch(this.baseURL+ '/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + getTokenFromLocalStorage()
            }, 
            body: JSON.stringify({
                name : newCar.name,
                type : newCar.type, 
                powerKw : newCar.powerKw,
                fin : newCar.fin
            })
          }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log("json");
                        console.log(json);
                        this.fetchCars(); 
                    });

                } else {
                    this.error = "Error on fetching";
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }

    @action deleteCar(carId) {
        return fetch(this.baseURL+'/' + carId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + getTokenFromLocalStorage()
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log("car deleted");
                         this.fetchCars(); 
                    });

                } else {
                    this.error = "Error on fetching";
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }
}

const store = new CarsStore();

export default store;