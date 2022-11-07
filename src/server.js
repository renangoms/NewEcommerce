// PACOTES
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

// START
const app = express();

// AMBIENTE
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

// ARQUIVOS ESTATICOS
app.use('/public', express.static(`${__dirname}/public`));
app.use('/public/images', express.static(`${__dirname}/public/images`));

// SETUP MONGODB
const dbs = require('./config/database');

const dbURI = isProduction ? dbs.dbProduction : dbs.dbTest;
mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('conectou ao BD'))
  .catch((error) => console.log('Erro de conexão ao BD: ', error.message));

// ENGINE
app.set('view engine', 'ejs');
app.set('views', './src/views');

// CONFIGURACOES
if (!isProduction) app.use(morgan('dev'));
app.use(cors());
app.disable('x-powered-by');
app.use(compression());

// SETUP BODY PARSER
app.use(bodyParser.urlencoded({ extended: false, limit: 1.5 * 1024 * 1024 }));
app.use(bodyParser.json({ limit: 1.5 * 1024 * 1024 })); // 1.5 Mb

// MODELS
require('./models');

// ROTAS
app.use('/', require('./routes'));

// 404 - ROTA
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ROTA - 422, 500, 401
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  if (err.status !== 404) console.warn('Error: ', err.message, new Date());
  res.json({ errors: { message: err.message, status: err.status } });
});

// ESCUTAR
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`🔥 Server started at http://localhost:${PORT}`);
});
