module.exports = (sequelize, dataTypes) => {
    const alias = "Subcategory"
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
        category_id:{
            type: dataTypes.INTEGER(11),
            allowNull:false
        }
       
    }

    const config = {
        tableName: "subcategories",
        timestamps: false
    }

    const Subcategory = sequelize.define(alias, cols, config)

    Subcategory.associate = models => {
        Subcategory.belongsTo(models.Category,{
            as: 'category',
            foreignKey: 'category_id'
        })
        Subcategory.hasMany(models.Product,{
            as: 'products',
            foreignKey: 'subcategory_id'
        })
    }

    return Subcategory
}