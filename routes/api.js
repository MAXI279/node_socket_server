
const router = require('express').Router();

const apiMensajesRouter = require('./api/mensajes');

router.use('/mensajes', apiMensajesRouter);

module.exports = router;
