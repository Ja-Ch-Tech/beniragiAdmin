var express = require('express');
var router = express.Router();

/* Liste demandes ADS. */
router.get('/demandes', function(req, res, next) {
	if (req.session.id_admin) {
		res.render('demandesADS', { title: 'Demandes compte VIP' });
	}else{
		res.redirect("/");
	}
  
});

/* Liste ADS. */
router.get('/liste', function(req, res, next) {
	if (req.session.id_admin) {
		res.render('listeAds', { title: 'Liste des demandes VIP' });
	}else{
		res.redirect("/");
	}
  
});

module.exports = router;
