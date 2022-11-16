const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../../auth');
const LojaController = require('../../../controllers/LojaController');
const { LojaValidation } = require('../../../controllers/validations/lojaValidation');

const lojaController = new LojaController();

router.get('/', lojaController.index);
router.get('/:id', celebrate(LojaValidation.show), lojaController.show);

router.post('/', auth.required, celebrate(LojaValidation.store), lojaController.store);
router.put('/:id', auth.required, LojaValidation.admin, celebrate(LojaValidation.update), lojaController.update);
router.delete('/:id', auth.required, LojaValidation.admin, lojaController.remove);

module.exports = router;
