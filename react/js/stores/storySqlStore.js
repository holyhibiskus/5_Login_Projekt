import { observable, action } from 'mobx';
import config from "../../config/main.config";
import {
    getTokenFromLocalStorage
} from "../helper/util";

class StoryStore {
    @observable selectedStory = {};
    @action selectCar(story) {
        this.selectedStory = story;
    }

    @observable storiesFromServer = [];
    @observable error = '';

    constructor() {
        this.baseURL = config.BASE_URL_CARS;
    }


    @action fetchStories() {
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
                        console.log("get request stories");
                        console.log(json);
                        this.storiesFromServer = json.stories;
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

    @action addNewStory(newStory) {
        return fetch(this.baseURL+ '/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + getTokenFromLocalStorage()
            },
            body: JSON.stringify({
                title : newStory.title,
                theme : newStory.theme,
                creator : newStory.creator
            })
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                response.json().then(json => {
                    console.log("json");
                    console.log(json);
                    this.fetchStories();
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

    @action deleteCar(storyId) {
        return fetch(this.baseURL+'/' + storyId, {
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
                        console.log("story deleted");
                        this.fetchStories();
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

const store = new StoryStore();

export default store;
