module.exports = (sequelize, dataTypes) => {
    const alias = "ProductImage"
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
        tableName: "product_images",
        timestamps: false
    }

    const Product_image = sequelize.define(alias, cols, config)

    Product_image.associate = function (models) {
        Product_image.belongsTo(models.Product,{
            as: 'images',
            foreignKey: 'product_id'
        })
        
    }
    
    
    return Product_image
}