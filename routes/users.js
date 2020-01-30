var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/liste', function(req, res, next) {
	if (req.session.id_admin) {
		res.render('listeUsers', { title: 'liste des utilisateurs' });
	}else{
		res.redirect("/");
	}
  
});

/* Details d'un utilisateur */
router.get('/:id_user/details', function(req, res, next) {
	if (req.session.id_admin) {
		res.render('detailsUser', { title: 'Profile' });
	}else{
		res.redirect("/");
	}
  
});

module.exports = router;
