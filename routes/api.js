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

//Route permettant de stopper ou renouveler une demande
router.get('/admin/vip/toggle/:id_vip', (req, res) => {
    axios.get(`${API}/admin/vip/toggleResponse/${req.session.id_admin}/${req.params.id_vip}`)
        .then(response => {
            res.status(200).send(response.data)
        })
        .catch(err => {
            res.status(200).send(err)
        })
})

//Route permettant de recuperer les details sur un utilisateur
router.get('/admin/users/:user_id/details', (req, res) => {
    axios.get(`${API}/admin/users/details/${req.session.id_admin}/${req.params.user_id}`)
         .then(response => {
            res.status(200).send(response.data)
         })
         .catch(err => {
             res.status(200).send(err)
         })
})

//Permet de certifié manuellement un utilisateur
router.post('/admin/users/certified/:user_id', (req, res) => {
    axios.post(`${API}/admin/users/certified/${req.session.id_admin}/${req.params.user_id}`)
         .then(response => {
             res.status(200).send(response.data)
         })
         .catch(err => {
             res.status(500).send(err)
         })
})

//Creation d'un metier
router.post('/admin/job/creation', (req, res) => {
    var data = {
        "nom": req.body.denomination,
        "icon": req.body.icon,
        "describe" : req.body.description,
        "id_admin" : req.session.id_admin
    };

    axios.post(`${API}/admin/jobs/create`, data)
         .then(response => {
             res.status(200).send(response.data)
         })
         .catch(err => {
             res.status(500).send(err)
         })
});

//Route pour la récupération de nombre de user par type
router.get('/admin/users/numberUserByType', (req, res) => {
    axios.get(`${API}/users/numberUserByType`)
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

//Creation d'une nouvelle ville
router.post('/admin/ville/creation', (req, res) => {
    var datas = {
        "nom" : req.body.denomination
    };
    axios.post(`${API}/town/create`, datas)
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

//Bloquer un compte beniragi
router.get('/admin/toggle/:id_user', (req, res) => {
    axios.get(`${API}/admin/users/toggle/${req.session.id_admin}/${req.params.id_user}`)
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

module.exports = router;