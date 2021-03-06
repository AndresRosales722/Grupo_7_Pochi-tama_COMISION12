module.exports = (sequelize, dataTypes) => {
    const alias = "Category"
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
        banner:{
            type: dataTypes.INTEGER(11),
            allowNull:false
        }
       
    }

    const config = {
        tableName: "categories",
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config)

       Category.associate = models => {
            Category.hasMany(models.Subcategory,{
                as: 'subcategories',
                foreignKey: 'category_id'
            })
        }

    return Category
}