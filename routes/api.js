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

module.exports = router;