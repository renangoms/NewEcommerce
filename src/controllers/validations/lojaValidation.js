const mongoose = require('mongoose');

const Usuario = mongoose.model('Usuario');

const { Joi, Segments } = require('celebrate');

const LojaValidation = {
  admin: (req, res, next) => {
    if (!req.payload.id) return res.sendStatus(401);
    const { loja } = req.query;
    if (!loja) return res.sendStatus(401);
    Usuario.findById(req.payload.id).then((usuario) => {
      if (!usuario) return res.sendStatus(401);
      if (!usuario.loja) return res.sendStatus(401);
      if (!usuario.permissao.includes('admin')) return res.sendStatus(401);
      if (usuario.loja.toString() !== loja) return res.sendStatus(401);
      next();
    }).catch(next);
  },
  show: {
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().alphanum().length(24).required(),
    }),
  },
  store: {
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      cnpj: Joi.string().length(18).required(),
      email: Joi.string().email().required(),
      telefones: Joi.array().items(Joi.string()).required(),
      endereco: Joi.object({
        local: Joi.string().required(),
        numero: Joi.string().required(),
        complemento: Joi.string().optional(),
        bairro: Joi.string().required(),
        cidade: Joi.string().required(),
        CEP: Joi.string().required(),
      }).required(),
    }),
  },
  update: {
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().optional(),
      cnpj: Joi.string().length(18).optional(),
      email: Joi.string().email().optional(),
      telefones: Joi.array().items(Joi.string()).optional(),
      endereco: Joi.object({
        local: Joi.string().optional(),
        numero: Joi.string().optional(),
        complemento: Joi.string().optional(),
        bairro: Joi.string().optional(),
        cidade: Joi.string().optional(),
        CEP: Joi.string().optional(),
      }).optional(),
    }),
  },
};

module.exports = { LojaValidation };
