var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.id_admin) {
    res.redirect(301, '/dashboard');
  } else {
    res.render('index', { title: 'Connexion' });
  }
});

module.exports = router;
