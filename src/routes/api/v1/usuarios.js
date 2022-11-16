const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../../auth');
const UsuarioController = require('../../../controllers/UsuarioController');
const { UsuarioValidation } = require('../../../controllers/validations/usuarioValidation');

const usuarioController = new UsuarioController();

router.post('/login', celebrate(UsuarioValidation.login), usuarioController.login);
router.post('/registrar', celebrate(UsuarioValidation.store), usuarioController.store);
router.put('/', auth.required, celebrate(UsuarioValidation.update), usuarioController.update);
router.delete('/', auth.required, usuarioController.remove);

router.get('/recuperar-senha', usuarioController.showRecovery);
router.post('/recuperar-senha', usuarioController.createRecovery);
router.get('/senha-recuperada', usuarioController.showCompleteRecovery);
router.post('/senha-recuperada', usuarioController.completeRecovery);

router.get('/', auth.required, usuarioController.index);
router.get('/:id', auth.required, celebrate(UsuarioValidation.show), usuarioController.show);

module.exports = router;
