const router = require('express').Router();
const controller = require('../controllers/transaction.controller.js')

router.get('/', controller.index);
router.post('/add', controller.add);
router.get('/:_id/complete', controller.complete);
module.exports = router;