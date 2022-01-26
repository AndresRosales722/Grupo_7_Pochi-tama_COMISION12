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
        db.Product.findAll()
        .then((products) => {
            res.render('index',{
                products,
                toThousand,
                session: req.session,
                users,
                categories
            })
        }) 
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