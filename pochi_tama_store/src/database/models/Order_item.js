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
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        product_id:{
            type: dataTypes.INTEGER(11),
            allowNull:false
        },
        quantity:{
            type: dataTypes.INTEGER(11),
            allowNull:false
        }
       
    }

    const config = {
        tableName: "order_items",
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config)

    return Category
}