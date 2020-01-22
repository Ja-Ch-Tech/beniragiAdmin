var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/liste', function(req, res, next) {
  res.render('listeUsers', { title: 'liste des utilisateurs' });
});

/* Details d'un utilisateur */
router.get('/:id_user/details', function(req, res, next) {
  res.render('detailsUser', { title: 'Profile' });
});

module.exports = router;
