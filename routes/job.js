var express = require('express');
var router = express.Router();

/* Creation d'un metier. */
router.get('/creation', function(req, res, next) {
	if (req.session.id_admin) {
		res.render('createMetier', { title: "Creation d'un nouveau metier" });
	}else{
		res.redirect("/");
	}
  
});

/* Liste des metiers. */
router.get('/liste', function(req, res, next) {
	if (req.session.id_admin) {
		res.render('listeMetier', { title: "Liste des metiers" });
	}else{
		res.redirect("/");
	}
  
});

module.exports = router;
