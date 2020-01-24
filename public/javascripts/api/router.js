import { login } from './admin.js';
import { newVIP } from './vip.js'

(() => {

    var pathName = window.location.pathname;

    //#region /
        if (pathName == "/") {
            login()
        }
    //#endregion

    //#region VIP
        if (pathName.split("/")[1] == "vip") {
            if (/demandes/i.test(pathName.split("/")[pathName.split("/").length - 1])) {
                newVIP()
            }
        }
    //#endregion
})();