import { login } from './admin.js';
import { newVIP, all } from './vip.js'
import { getUsers, getUserDetails, getStatsUsers, createTown } from './client_api.js';
import { select, addJob, listJobs } from './job_api.js';
import { listTown } from './town_api.js';

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
        if (/details/i.test(pathName.split("/")[pathName.split("/").length - 1])) {
            var user_id = pathName.split('/')[2];
            getUserDetails(user_id);
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

    //#region JOB
    if (pathName.split("/")[1] == "metier") {
        if (/creation/i.test(pathName.split("/")[pathName.split("/").length - 1])) {
            select();
            addJob();
        }

        if (/liste/i.test(pathName.split("/")[pathName.split("/").length - 1])) {
            listJobs();
        }
    }
    //#endregion

    //#region STATS
    if (pathName.split("/")[1] == "dashboard") {
        getStatsUsers();
    }
    //#endregion

    //#region TOWN
    if (pathName.split("/")[1] == "ville") {
        if (/creation/i.test(pathName.split("/")[pathName.split("/").length - 1])) {
            createTown();
        }

        if (/liste/i.test(pathName.split("/")[pathName.split("/").length - 1])) {
            listTown();
        }
    }
    //#endregion
})();