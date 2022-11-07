module.exports = {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'AOKCD023REF9KWEKDSAK32KDA93JMKDKASD',
  api: process.env.NODE_ENV === 'production' ? 'https://api.loja-teste.ampliee.com' : 'http://localhost:3000',
  loja: process.env.NODE_ENV === 'production' ? 'https://loja-teste.ampliee.com' : 'http://localhost:8000',
};
