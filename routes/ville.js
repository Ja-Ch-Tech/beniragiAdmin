var express = require('express');
var router = express.Router();

/* Creation d'une ville. */
router.get('/creation', function(req, res, next) {
	if (req.session.id_admin) {
		res.render('createVille', { title: "Creation d'une nouvelle ville" });
	}else{
		res.redirect("/");
	}
  
});

module.exports = router;
