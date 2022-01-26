module.exports = (sequelize, dataTypes) => {
    const alias = "User"
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
        last_name:{
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
        tableName: "users"
    }

    const User = sequelize.define(alias, cols, config)

    return User
}