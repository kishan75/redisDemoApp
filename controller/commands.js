var common = require('../common');
let shared = require('../shared');
var commonDbObject = common.dbFile.dbObject;
let constants = require('../constant');

/* all controller functions */

/* get value of a specific key */
let get = (req, res) => {
  let key = common.dbFile.getKey(req.params.key);
  if (key) {
    if (shared.getDataType(req.params.key) == constants.DATA_TYPE.string) {
      res.send(key.value.toString());
      return;
    }
  }
  res.send('nil');
};

/* set value of a specific key */
let set = (req, res) => {
  const { key, value } = req.body;
  if ((typeof value == 'string' || typeof value == 'number') && (key != '' && value != '')) {
    commonDbObject[key] = { value };
    res.send('OK');
    return;
  }
  res.send('nil');
};

/* add or update orderd set */
let zadd = (req, res) => {
  let { setName, key, score } = req.body;
  score = parseInt(score);
  let result = common.dbFile.getKey(setName);
  if (result) {
    if (shared.getDataType(result) != constants.DATA_TYPE.orderdSet) {
      res.send('nil');
      return;
    }
    let size = commonDbObject[setName].tree.size;
    common.treap.insert(key, score, commonDbObject[setName].tree)
    commonDbObject[setName].set[key] = score;
    res.send((commonDbObject[setName].tree.size - size).toString());
  }
  else {
    commonDbObject[setName] = {
      set: { [key]: score },
      tree: common.treap.insert(key, score, commonDbObject[setName])
    };
    res.send(commonDbObject[setName].tree.size.toString());
  }
};

/* to calculate rank of a element based on score */
let zrank = (req, res) => {
  const { setName, key } = req.params;
  let result = common.dbFile.getKey(setName);
  if (result && shared.getDataType(setName) == constants.DATA_TYPE.orderdSet && key in result['set']) {
    let rank = common.treap.getRank(result.tree, key, result["set"][key]);
    res.send((rank - 1).toString());
    return;
  }
  res.send('nil');
};

/* to calculate all members in orderd set */
let zcard = (req, res) => {
  const { setName } = req.params;
  let result = common.dbFile.getKey(setName);
  if (result && shared.getDataType(setName) == constants.DATA_TYPE.orderdSet) {
    if ("size" in result.tree)
      res.send(commonDbObject[setName].tree.size.toString());
    else
      res.send(0);
    return;
  }
  res.send('nil');
};

/* to set expire time on a key */
let expire = (req, res) => {
  const { key, time } = req.body;
  let result = common.dbFile.getKey(key);
  if (!result) {
    res.send('0');
    return;
  }
  commonDbObject[key].expireAt = new Date(Date.now() + parseInt(time));
  res.send('1');
};

/* to get time to live of a key */
let ttl = (req, res) => {
  const { key } = req.params;
  let result = common.dbFile.getKey(key);
  if (!result) {
    res.send('nil');
    return;
  }
  if ("expireAt" in result) {
    res.send((result.expireAt - new Date()).toString());
    return;
  }
  res.send('nil');
};

/* print all nodes under a range */
let zrange = (req, res) => {
  var { score1, score2, setName } = req.params;
  score1 = parseInt(score1);
  score2 = parseInt(score2);
  let key = common.dbFile.getKey(setName);
  if (!key) {
    res.send('nil');
    return;
  }
  if (shared.getDataType(setName) === constants.DATA_TYPE.orderdSet) {
    if (score1 < 0)
      score1 = Infinity;
    if (score2 < 0)
      score2 = Infinity;
    var result = [];
    common.treap.getRange(key.tree, score1, score2, result);
    res.send(result);
  }
  else {
    res.send('nil');
    return;
  }
};

module.exports = {
  set,
  get,
  zrank,
  zcard,
  zadd,
  expire,
  ttl,
  zrange
};
