var router = require('express').Router();
var common = require('../common');

/* GET users listing. */
router.get('/get/:key', function (req, res) {
  res.send(req.params.key);
  if (common.dbFile.dbObject[req.params.key])
    res.send(common.dbFile.dbObject[req.params.key]);
  else
    res.send('nil');
});

router.post('/set', function (req, res) {
  const { key, value } = req.body;
  for (let i = 0; i < 3; i++) {
    key = i.toString()
      ;
    value = i;
    common.dbFile.dbObject[key] = value;
    common.dbFile.writeToJsonFile();
  }
  res.send('done');
});

router.post('/zadd', function (req, res) {
  const { setName, key, score } = req.body;
  //console.log(setName, key, score);
  for (let i = 0; i < 4; i++) {
    common.dbFile.dbObject[setName] = common.treap.insert(i.toString(), i, common.dbFile.dbObject[setName]);
   // console.log('every end loop', common.dbFile.dbObject[setName]);
  }
  res.send('done');
});

module.exports = router;
