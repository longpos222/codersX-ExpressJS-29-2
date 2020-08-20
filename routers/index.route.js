const router = require('express').Router();
const controller = require('../controllers/index.controller.js');

router.get('/', controller.index);

module.exports = router;