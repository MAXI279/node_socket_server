module.exports = (sequelize, type) => {
    return sequelize.define('mensaje', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: type.INTEGER,
        msg: type.STRING,
        room: type.STRING
    })
}