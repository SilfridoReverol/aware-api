const router = require('express').Router();
const beck = require('../controllers/becksController');

router.post('/', beck.createBeck);
router.get('/:userId', beck.getBecks);
router.post('/:becksId', beck.createBecksPdf);
router.post('/send/:becksId', beck.sendBecks);
router.delete('/:becksId', beck.deleteBecks);

module.exports = router;
