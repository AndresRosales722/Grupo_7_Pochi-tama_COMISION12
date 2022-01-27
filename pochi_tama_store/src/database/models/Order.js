module.exports = (sequelize, dataTypes) => {
    const alias = "Order"
    const cols = {
        id:{
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        status:{
            type: dataTypes.STRING(100),
            allowNull:false
        }
       
    }

    const config = {
        tableName: "orders",
        timestamps: false
    }

    const Order = sequelize.define(alias, cols, config)


    return Order
}