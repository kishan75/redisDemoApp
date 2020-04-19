var router = require('express').Router();
var common = require('../common');

/* GET home page. */
router.get('/', function (req, res) {
  console.log(common.dbFile.dbObject);
  res.send(common.dbFile.dbObject);
});

router.use('/commands', require('./commands'));

module.exports = router;
