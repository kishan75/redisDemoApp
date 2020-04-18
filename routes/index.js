var router = require('express').Router();
var common = require('../common');

/* GET home page. */
router.get('/', function (req, res) {
  console.log(common.dbFile.dbObject);
  res.render('index', { title: 'Express' });
});

module.exports = router;
