const router = require('express').Router();

router.use('/usuarios', require('./usuarios'));
router.use('/loja', require('./loja'));

module.exports = router;
