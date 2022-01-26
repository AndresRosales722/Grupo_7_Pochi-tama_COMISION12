module.exports = (sequelize, dataTypes) => {
    const alias = "Product"
    const cols = {
        id:{
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        price:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        discount:{
            type:dataTypes.INTEGER(11),
            defaultValue: null
        },
        description:{
            type:dataTypes.STRING(500),
            defaultValue: null
        },
        subcategory_id:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
    
    }

    const config = {
        /* timestamp:false */
        tableName: "products",
        createdAt: "created_at",
        updatedAt: "updated_at"
    }

    const Product = sequelize.define(alias, cols, config)

    return Product
}