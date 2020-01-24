import { login } from './admin.js';
import { getUsers } from './client_api.js';

(() => {

    var pathName = window.location.pathname;

    //#region /
    if (pathName == "/") {
        login()
    }
    //#endregion

    //#region users
    if (pathName.split('/')[1] == "users") {
        if (pathName.split('/')[2] == "liste") {
            getUsers();
        }
    }
    //#endregion
})();