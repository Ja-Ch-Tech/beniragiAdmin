var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.id_admin) {
		res.render('dashboard', { title: 'Tableau de board' });
	}else{
		res.redirect("/");
	}
  
});

module.exports = router;
