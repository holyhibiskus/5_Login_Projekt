import { observable, action } from 'mobx';
import config from "../../config/main.config";

class storyStore {
    @observable selectedStory = {};
    @action selectStory(story) {
        this.selectedStory = story;
    }

    @observable storiesFromServer = [];
    @observable featuredStoriesFromServer = [];
    @observable error = '';

    constructor() {
        console.log(config);
        this.baseURL = config.BASE_URL_STORY;
        console.log("base");
        console.log(this.baseURL)
    }


    @action fetchStories() {
        return fetch(this.baseURL+'/story/all/', {
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

    @action fetchFeaturedStories(amount, offset) {
        return fetch(this.baseURL+'/story/featured/?amount='+amount+'&offset='+offset, {
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
                        console.log("get request featured stories");
                        console.log(json);
                        this.featuredStoriesFromServer = json.stories;
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

    @action fetchStoriesByAuthor(theme, amount, offset) {
        return fetch(this.baseURL+'/story/theme/'+theme+'/?amount='+amount+'&offset='+offset, {
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
                        console.log("get request stories by theme");
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
        return fetch(this.baseURL+ '/story/add/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                STORY_NAME : newStory.name,
                THEME : newStory.theme,
                CREATOR : newStory.author,
            })
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                response.json().then(json => {
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

    @action deleteStory(storyId) {
        return fetch(this.baseURL+'/story/delete/' + storyId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log("car deleted");
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

const store = new storyStore();

export default store;
