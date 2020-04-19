var router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

router.use('/commands', require('./commands'));

router.get('*', (req, res) => {
  res.send("this url does'nt exist");
});

module.exports = router;
