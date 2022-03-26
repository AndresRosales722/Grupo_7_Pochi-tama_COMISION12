module.exports = (sequelize, dataTypes) => {
    const alias = "OrderItem"
    const cols = {
        id:{
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        order_id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
        },
        product_id:{
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull:false
        },
        user_id:{
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull:false
        },
        quantity:{
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull:false
        }
       
    }

    const config = {
        tableName: "order_items",
        timestamps: false
    }

    const Order_items = sequelize.define(alias, cols, config)

    Order_items.associate = models => {
        Order_items.belongsTo(models.Order, {
            as:"order",
            foreignKey: "order_id"
        })
        Order_items.belongsTo(models.Product, {
            as:"products",
            foreignKey: "product_id"
        })
    }

    return Order_items
}