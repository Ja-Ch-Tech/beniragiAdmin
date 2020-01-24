var express = require('express');
var router = express.Router();
var axios = require("axios").default;
var API = require("../manageURL").URL().API;

var session = require("cookie-session");
var app = express();

app.use(session({
    secret: "FrdrcpeterBeniragiAdmin6586787"
}))

//Connexion admin
router.post('/admin/login', (req, res) => {
    var data = {
        username: req.body.username,
        password: req.body.password
    }

    axios.post(`${API}/admin/login`, data)
        .then(response => {
            if (response.data.getEtat) {
                //Mise en session
                req.session.id_admin = response.data.getObjet.id_admin;
                req.session.username = response.data.getObjet.username;

                res.status(200).send(response.data);
            } else {
                res.status(200).send(response.data)
            }
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

//Recupere la session de l'utilisateur
router.get('/getSessionUser', (req, res) => {
    let id = req.session.id_admin ? req.session.id_admin : null,
        username = req.session.username ? req.session.username : null;
    obj = {
        "user_id": id,
        "username": username
    };

    res.status(200);
    res.send(obj)
});

//Recupere tous les utilisateurs
router.get('/admin/getUsers/:id_admin', (req, res) => {
    axios.get(`${API}/admin/users/listUsers/${req.params.id_admin}`)
        .then(response => {
            res.status(200).send(response.data)
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

//Récupération des nouvelles demandes VIP
router.get('/admin/vip/new', (req, res) => {
    axios.get(`${API}/admin/vip/new/${req.session.id_admin}`)
         .then(response => {
            res.status(200).send(response.data)
         })
         .catch(err => {
             res.status(500).send(err)
         })
})

//Reponse aux demandes
router.post('/admin/vip/responseRequest', (req, res) => {
    var data = {
        "id_vip": req.body.id_vip,
        "response": req.body.response
    };

    axios.post(`${API}/admin/vip/respondQuery/${req.session.id_admin}`, data)
         .then(response => {
             res.status(200).send(response.data)
         })
         .catch(err => {
             res.status(500).send(err)
         })
})

//Route permettant de récupérer tous les demandes vip
router.get('/admin/vip/getall', (req, res) => {
    axios.get(`${API}/admin/vip/getall/${req.session.id_admin}`)
         .then(response => {
            res.status(200).send(response.data)
         })
         .catch(err => {
             res.status(200).send(err)
         })
})

module.exports = router;