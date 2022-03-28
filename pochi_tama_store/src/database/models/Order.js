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

    Order.associate = models => {
        Order.belongsTo(models.User, {
            as:"users",
            foreignKey: "user_id"
        })
        Order.hasMany(models.OrderItem, {
            as: "orderItems",
            foreignKey: "order_id",
            onDelete:'cascade'
        })
    }

    return Order
}