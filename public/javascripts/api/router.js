import { login } from './admin.js';
import { newVIP, all } from './vip.js'
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

    //#region VIP
        if (pathName.split("/")[1] == "vip") {
            if (/demandes/i.test(pathName.split("/")[pathName.split("/").length - 1])) {
                newVIP()
            }

            if (/liste/i.test(pathName.split("/")[pathName.split("/").length - 1])) {
                all()
            }
        }
    //#endregion
})();