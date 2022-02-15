const fs = require('fs');
const path = require('path');

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
            })
        }) 
        .catch((error)=>console.log(error)) 
    },
    contacto:(req,res) => {
        res.render('contacto',{
            session: req.session,
        
        })
    }
}

module.exports = controller