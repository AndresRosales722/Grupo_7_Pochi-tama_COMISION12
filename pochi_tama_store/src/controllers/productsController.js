const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models'); 
const sequelize = db.sequelize; 
const { Op } = require("sequelize");  

const Products = db.Product;
const Categories = db.Category;
const Subcategories = db.Subcategory;


let controller = {

    allProducts:(req,res) =>{
        let filterProduct;
        switch (req.query.filter) {
            case "nameAsc":
                filterProduct = Products.findAll({ include : [{association : "productImages"},], order : [["name", "ASC"]]})
                break;
            case "nameDesc":
                filterProduct  = Products.findAll({ include : [{association : "productImages"},], order : [["name", "DESC"]]})
                break;
            case "priceMin":
                filterProduct  = Products.findAll({ include : [{association : "productImages"},], order : [["price", "ASC"]]})
                break;
            case "priceMay":
                filterProduct  = Products.findAll({ include : [{association : "productImages"},], order : [["price", "DESC"]]})
                break;
            default:
                filterProduct  = Products.findAll({ include : [{association : "productImages"},]})
                break;
        }
        
        Promise.all([filterProduct])
        .then(([products])=>{
            res.render("products/allProducts", {
                products,
                toThousand,
                session: req.session
            })

        }) 

        
    },
    
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
    
    cart: async (req,res) => {
        if(!req.session.cart) {
            return res.status(500).json({
                ok: false,
                msg: 'Comuniquese con el administrador'
            })
        }

        let response = {
            ok:true,
            meta: {
                total: req.session.cart.length
            },
            data: req.session.cart
        }

        return res.status(200).json(response)
    },
    add: async (req,res) => {
        console.log(req.session.cart);
        try {

            let product = await db.Product.findByPk(req.params.id,{
                include: [{
                    all: true
                }]

            })

            const {  name, price , discount} = product;

            let item = {
                
                name,
                price,
                discount,
                /* image: product.productImages[0], */
                amount: 1,
                total: price
            }

            if(!req.session.cart){
                req.session.cart = []
            }

            console.log(req.session.cart);

            let response = {
                ok:true,
                meta: {
                    total: req.session.cart.length
                }, 
                data: req.session.cart
            }
    
            return res.status(200).json(response)

        } catch (error) {
            console.log(error)
        }
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
        .then((products) => {
            res.render('searchResult', {
                products,
                search: req.query.keywords,
                session: req.session,
                toThousand
            })
        })

    }
}



    
module.exports = controller