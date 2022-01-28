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
            type:dataTypes.INTEGER(11).UNSIGNED,
            allowNull:false
        },
        discount:{
            type:dataTypes.INTEGER(11).UNSIGNED,
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
        tableName: "products",
        timestamp: true,
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = models => {  
        Product.belongsTo(models.Subcategory,{
            as: 'subcategories',
            foreignKey: 'subcategory_id'
        })
        Product.hasMany(models.ProductImage,{
            as: 'productImages',
            foreignKey: 'product_id'
        })
        Product.hasMany(models.OrderItem, {
            as: "order_items",
            foreignKey: "product_id"
        })
        
    }

    return Product
}