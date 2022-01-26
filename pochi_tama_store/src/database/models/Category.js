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
        category_id:{
            type: dataTypes.INTEGER(11),
            allowNull:false
        }
       
    }

    const config = {
        tableName: "categories",
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config)

       /*  Category.associate = function (models) {
            Category.hasMany(models.Subcategories,{
                as: 'Subcategories',
                foreignKey: 'category_id'
            })
        } */

    return Category
}