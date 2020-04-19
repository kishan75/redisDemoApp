var router = require('express').Router();
var controller = require('../controller');

router.get('/get/:key', (req, res) => {
  controller.commands.get(req, res);
});

router.post('/set', (req, res) => {
  controller.commands.set(req, res);
});

router.post('/zadd', (req, res) => {
  controller.commands.zadd(req, res);
});

router.get('/zrank/:setName/:key', (req, res) => {
  controller.commands.zrank(req, res);
});

router.get('/zcard/:setName', (req, res) => {
  controller.commands.zcard(req, res);
});

router.post('/expire', (req, res) => {
  controller.commands.expire(req, res);
});

router.get('/ttl/:key', (req, res) => {
  controller.commands.ttl(req, res);
});

router.get('/zrange/:setName/:score1/:score2', (req, res) => {
  controller.commands.zrange(req, res);
});

module.exports = router;
