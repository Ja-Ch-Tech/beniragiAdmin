import { login } from './admin.js';

(() => {

    var pathName = window.location.pathname;

    //#region /
        if (pathName == "/") {
            login()
        }
    //#endregion
})();