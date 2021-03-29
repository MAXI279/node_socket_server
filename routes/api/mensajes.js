const router = require('express').Router();
const { Mensaje } = require('../../db');


router.get('/', async (req, res) => {
    const mensajes = await Mensaje.findAll();
    res.json(mensajes);
});

router.get('/room/:room', async (req, res) => {
    const mensajes = await Mensaje.findAll({
        where: {
          room: req.params.room
        }
      });
    res.json(mensajes);
});

router.post('/', async (req, res) => {
    const mensaje = await Mensaje.create(req.body);
    res.json(mensaje);
});

module.exports = router;