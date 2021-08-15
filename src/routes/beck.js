const router = require('express').Router();
const beck = require('../controllers/becksController');

router.post('/', beck.createBeck);
router.get('/:userId', beck.getBecks);
router.post('/:userId', beck.createBecksPdf);
router.delete('/:becksId', beck.deleteBecks);

module.exports = router;
