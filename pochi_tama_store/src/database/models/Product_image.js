module.exports = (sequelize, dataTypes) => {
    const alias = "ProductImages"
    const cols = {
        id:{
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        product_id:{
            type: dataTypes.INTEGER(11),
            allowNull:false
        }
       
    }

    const config = {
        tableName: "products_images",
        timestamps: false
    }

    const Product_image = sequelize.define(alias, cols, config)

    return Product_image
}