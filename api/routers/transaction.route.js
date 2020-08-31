const router = require('express').Router();
const controller = require('../controllers/transaction.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

// router.get('/', controller.index);
router.get('/', authMiddleware.apiAuthRequire, controller.index);
// router.post('/add', controller.add);
// router.get('/:_id/complete', controller.complete);
// router.get('/:_id/delete', controller.delete);

module.exports = router;