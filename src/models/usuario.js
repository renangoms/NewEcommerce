const mongoose = require('mongoose');

const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'não pode ficar vazio.'],
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'não pode ficar vazio.'],
    index: true,
    match: [/\S+@\S+\.\S+/, 'é inválido.'],
  },
  loja: {
    type: Schema.Types.ObjectId,
    ref: 'Loja',
    required: [true, 'não pode ficar vazia.'],
  },
  permissao: {
    type: Array,
    default: ['cliente'],
  },
  hash: String,
  salt: String,
  recovery: {
    type: {
      token: String,
      date: Date,
    },
    default: {},
  },
}, { timestamps: true });

UsuarioSchema.plugin(uniqueValidator, { message: 'já está sendo utilizdo' });

UsuarioSchema.methods.setSenha = function setSenha(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsuarioSchema.methods.validarSenha = function validarSenha(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return hash === this.hash;
};

UsuarioSchema.methods.gerarToken = function gerarToken() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 15);

  return jwt.sign({
    id: this._id,
    email: this.email,
    nome: this.nome,
    exp: parseFloat(exp.getTime() / 1000, 10),
  }, secret);
};

UsuarioSchema.methods.enviarAuthJSON = function enviarAuthJSON() {
  return {
    _id: this._id,
    nome: this.nome,
    email: this.email,
    loja: this.loja,
    role: this.permissao,
    token: this.gerarToken(),
  };
};

// RECUPERACAO
UsuarioSchema.methods.criarTokenRecuperacaoSenha = function criarTokenRecuperacaoSenha() {
  this.recovery = {};
  this.recovery.token = crypto.randomBytes(16).toString('hex');
  this.recovery.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // 1 Dia
  return this.recovery;
};

UsuarioSchema.methods.finalizarTokenRecuperacaoSenha = function finalizarTokenRecuperacaoSenha() {
  this.recovery = { token: null, date: null };
  return this.recovery;
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
