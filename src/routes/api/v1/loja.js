const router = require('express').Router();
const lojaValidation = require('../../../controllers/validations/lojaValidation');
const auth = require('../../auth');
const LojaController = require('../../../controllers/LojaController');

const lojaController = new LojaController();

router.get('/', auth.required, lojaController.index);
router.get('/:id', lojaController.show);

router.post('/', auth.required, lojaValidation, lojaController.store);
router.put('/:id', auth.required, lojaValidation, lojaController.update);
router.delete('/:id', auth.required, lojaValidation, lojaController.remove);

module.exports = router;
