var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 	 res.render('index', { title: 'Connexion' });
});


/*Deconnexion . */
router.get("/logout", (req, res) => {

    if (req.session.id_admin) {
        delete req.session.id_admin;
        delete req.session.username;

    } else {
        res.redirect("/");
    }

    res.redirect("/");
});

module.exports = router;
