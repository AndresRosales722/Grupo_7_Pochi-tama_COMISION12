const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const Products = db.Product;
const Categories = db.Category;
const Subcategories = db.Subcategory;


let controller = {
    index:(req,res) => {
        req.session.cart = []
        Products.findAll({ include : [{association : "productImages"},], order : [["name", "ASC"]],limit:[20]})
        .then((products) => {
            res.render('index',{
                products,
                toThousand,
                session: req.session,
            })
        }) 
        .catch((error)=>console.log(error)) 
    },
    sucursales:(req,res) => {
        res.render('sucursales',{
            session: req.session,
        
        })
    },
    comprar:(req,res) => {
        res.render('comprar',{
            session: req.session,
        })
    },
    terms:(req,res) => {
        res.render('terms',{
            session: req.session,
        })
    }
}

module.exports = controller  


