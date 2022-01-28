const fs = require('fs');
const path = require('path');
const { users, writeUsersJSON , categories} = require('../database/dataBase')
/* const productsFilePath = path.join(__dirname, '../database/products.json'); */
/* const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); */
 
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let controller = {
    index:(req,res) => {
        db.Product.findAll({
            include: [
                {association: 'subcategories'},
                {association: 'productImages'},
            ]
        })
        .then((products) => {
            /* res.send(products) */
            res.render('index',{
                products,
                toThousand,
                session: req.session,
                users,
                categories
            })
        }) 
        .catch((error)=>console.log(error))
    }
}


/* index:(req,res)=>{
        res.render('index',{
            products,
            toThousand,
            session: req.session,
            users,
            categories
        })
    } */

module.exports = controller