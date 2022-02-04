const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models'); 
const sequelize = db.sequelize; 
const { Op } = require("sequelize");  

const Products = db.Product;
const Categories = db.Category;
const Subcategories = db.Subcategory;


let controller = {
    
    detail:(req,res)=>{
        Products.findOne({
            where: {
                id: req.params.id
            },
            include: [{association: "productImages"}]
        })
        .then((product) => {
            res.render('products/detail',{
                product,
                toThousand,
                session: req.session
            })
        })
        .catch((error)=>console.log(error))

    },
    category: (req,res) =>{
        Categories.findOne({
            where:{
                id: req.params.id
            },
            include: [{
                association: "subcategories",
                include: [{
                    association: "products",
                    include: [{
                        association:"productImages"
                    }]
                }]
            }]
        })
        .then((category) => {
            let subcategories = category.subcategories
            let products = []
            subcategories.forEach((subcategory) => {
                subcategory.products.forEach((product) => {
                    products.push(product)
                })
            })
            res.render('categories', {
                products,
                category,
                subcategories,
                session: req.session,
                toThousand
            })
        })
        .catch(error => console.log(error))

    },

    subcategory: (req,res) =>{
        Subcategories.findByPk(req.params.subcategory,{
            include:[{
                association: "products",
                include: [{
                    association: "productImages"
                }]
            }]
        })
        .then((subcategory) => {
            Categories.findByPk(req.params.category_id ,{
                include:[{association:'subcategories'}]
            })
            .then((category) => {
                res.render('subcategory',{
                    products: subcategory.products,
                    category,
                    subcategories: category.subcategories,
                    session: req.session,
                    toThousand
                })
            })
        })
    
    },
    
    cart:(req,res)=>{
        res.render('products/productCart',{
            session: req.session
        })
    },

    search: (req, res) => {
        Products.findAll({
            where:{
                name:{
                    [Op.substring]: req.query.keywords
                }
            },
            include: [{association:'productImages'}]
        })
        .then((result) => {
            res.render('searchResult', {
                result,
                search: req.query.keywords,
                session: req.session,
                toThousand
            })
        })

    }
}



    
module.exports = controller