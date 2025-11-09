const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/actividadesController');
const { authRequired } = require('../middleware/authMiddleware');

router.get('/', authRequired, ctrl.list);
router.get('/:id', authRequired, ctrl.getById);
router.post('/', authRequired, ctrl.create);
router.put('/:id', authRequired, ctrl.update);
router.delete('/:id', authRequired, ctrl.remove);

module.exports = router;
