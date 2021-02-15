/**
 * Created by Matijas on 11.04.2017.
 */

import { isDevelop } from "../js/helper/util";

export default {
    BASE_URL: isDevelop() ? "http://localhost:3000/api/" : "http://localhost:3000/api/",
    BASE_URL_CARS: isDevelop() ? "http://localhost:3000/api/story" : "http://localhost:3000/api/story",
    BASE_URL_STORY: isDevelop() ? "http://localhost:3000/api/story" : "http://localhost:3000/api/story",
    STORAGE_KEY: "H737398",
    USER_STORAGE_KEY: "aaa62873"
}
w
