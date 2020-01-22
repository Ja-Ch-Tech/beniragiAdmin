var express = require('express');
var router = express.Router();

/* Liste demandes ADS. */
router.get('/demandes', function(req, res, next) {
  res.render('demandesADS', { title: 'Demandes compte VIP' });
});

/* Liste ADS. */
router.get('/liste', function(req, res, next) {
  res.render('listeAds', { title: 'Liste des ADS' });
});

module.exports = router;
