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

    const ProductImage = sequelize.define(alias, cols, config)

    ProductImage.associate = models => {
        ProductImage.belongsTo(models.Product,{
            as: 'product',
            foreignKey: 'product_id'
        })
        
    }
    
    
    return ProductImage
}