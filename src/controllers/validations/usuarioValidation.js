const { Joi, Segments } = require('celebrate');

const UsuarioValidation = {
  show: {
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().alphanum().length(24).required(),
    }),
  },
  store: {
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
      loja: Joi.string().alphanum().length(24).required(),
    }),
  },
  update: {
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().optional(),
      email: Joi.string().email().required(),
      password: Joi.string().optional(),
      oldPassword: Joi.string().optional(),

    }),
  },
  login: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
};

module.exports = {
  UsuarioValidation,
};
