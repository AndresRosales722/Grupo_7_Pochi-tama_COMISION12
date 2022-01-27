module.exports = (sequelize, dataTypes) => {
    const alias = "Product"  // Nombre del modelo
    const cols = {           // Configuracion de las columnas y sus datos
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

    const config = {   // 
        timestamp: true,
        tableName: "products",
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = function (models) {       // Hacemos la asociacion con el modulo de subcategory y ProductImage
        Product.belongsTo(models.Subcategory,{
            as: 'subcategory',
            foreignKey: 'subcategory_id'
        })
        Product.hasMany(models.ProductImage,{
            as: 'images',
            foreignKey: 'product_id'
        })
        
    }

    return Product
}