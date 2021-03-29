const Sequelize = require('sequelize');

const MensajeModel = require('./models/mensajes')

const sequelize = new Sequelize('subasta', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Mensaje = MensajeModel(sequelize, Sequelize);

sequelize.sync({ force: false })
    .then(()=> {
        console.log('Tablas sincronizadas')
    })

module.exports = {
    Mensaje
}