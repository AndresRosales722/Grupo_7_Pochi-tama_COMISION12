const fs = require('fs');
const path = require('path');
const { users, writeUsersJSON , categories} = require('../database/dataBase')

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Products = db.Product;
const Categories = db.Category;
const Subcategories = db.Subcategory;


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let controller = {
    index:(req,res) => {
       Products.findAll({
            include: [
                {association: 'productImages'},
            ]
        })
        .then((products) => {
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

module.exports = controller