const router = require('express').Router();
const { errors } = require('celebrate');
const express = require('express');

const app = express();
app.use(errors());

router.use('/usuarios', require('./usuarios'));
router.use('/loja', require('./loja'));

module.exports = router;
