const fs = require('fs');
const path = require('path');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let {validationResult} = require('express-validator')
const db = require('../database/models');
const { Op } = require("sequelize");

const Products = db.Product;
const Categories = db.Category;
const Subcategories = db.Subcategory;
const ProductImages = db.ProductImage;

let controller = {
    
    list: async (req,res) => {
        try{

            let url = `http://${req.headers.host}${req.originalUrl}`

            if(url.includes("pages") && !url.includes("size")){
                throw new SyntaxError("dato incorrecto")
            }

            const {page, size, orderBy, orderDirect, ...updateQuery} = req.query
            const order = orderBy ? orderBy : "id"
            const direction = orderDirect ? orderDirect : "ASC"

            for(let key in updateQuery) {
                if(updateQuery[key] == null || updateQuery[key].trim().length == 0){
                    delete updateQuery[key]
                }
                if(key == "name") {
                    updateQuery[key] = {[Op.substring]: req.query.name}
                }
            }

            const getpagination = (page,size) => {
                const limit = size ? +size : 5
                const offset = page ? page * limit : 0
                return{limit ,offset}
            }
            const {limit,offset} = getpagination(page,size)
            


            let data = await Products.findAndCountAll({
                where: {

                },
                order: [[order, direction]],
                limit: limit,
                offset: offset
            })

        }catch(error){
            return res.status(500).json({
                msg: "Lo siento , ocurrio un error"
            })
        }
    }
    /* (req,res)=>{
        let url = `http://${req.headers.host}${req.originalUrl}`
        
        const getPageData = (data, page , limit) =>{
            const{count , rows:result } = data
            const pages = Math.ceil(count / limit)
            const currentPage = page ? + page : 0
            let next_page = ""
            let previous_page = ""
            
            if(url.includes('page')){
                
                let page_params = url.substring(url.search(/page/i), url.search(/&/i))
                
                if(currentPage == 0) {
                    next_page = url.replace(page_params, `page=${currentPage + 1}`)
                }else{
                    previous_page = url.replace(page_params, `page=${currentPage - 1}`)
                    next_page = url.replace(page_params, `page=${currentPage + 1}`)
                }
                
            }else{
                next_page = `${url}?page=${currentPage + 1}&size=${limit}`
            }
            
            const next = page == (pages -1) ? null : next_page
            const previous = currentPage == 0 ? null : previous_page
            
            return { count, pages, currentPage, previous, next , result}
        }
        
        const {page,size} = req.query
        
        const getpagination = (page,size) => {
            
            const limit = size ? +size : 5
            const offset = page ? page * limit : 0
            
            return{limit ,offset}
        }
        const {limit,offset} = getpagination(page,size)
        
        Products.findAndCountAll({
            limit: limit,
            offset: offset
        })
        .then(response => {
            const data = getPageData(response , page , limit)

            res.json({
                info : {
                    count : data.count,
                    pages: data.pages,
                    currentPage: data.currentPage,
                    previous: data.previous,
                    next: data.next
                },
                result : data.result
            })

            res.render('products/products',{
                products: data.result,
                toThousand,
                session: req.session,
                count : data.count,
                pages: data.pages,
                currentPage: data.currentPage,
                previous: data.previous,
                next: data.next
            })
        }) 
        .catch((error)=>console.log(error))
    } */,
    
    add:(req,res)=>{
        let allCategories = Categories.findAll()
        let allSubcategories = Subcategories.findAll()
        Promise.all([allCategories,allSubcategories])
        .then(([categories,subcategories]) => {
            res.render('admin/products/productCreate',{
                categories,
                subcategories,
                session: req.session
            })
        })
    },
    
    create:(req,res)=>{
        let errors = validationResult(req)
        let arrayImages = [];
        if(req.files){
            req.files.forEach((image) => {
                arrayImages.push(image.filename)
            })
        }
        
        if (errors.isEmpty()) {
            const {name, price, category, subcategory, description, discount} = req.body;
            
            Products.create({
                name,
                price,
                description,
                discount,
                subcategory_id: subcategory,
            })
            .then((product) => {
                if(arrayImages.length > 0){
                    let images = arrayImages.map((image) => {
                        return {
                            image: image,
                            product_id: product.id
                        }
                    });
                    ProductImages.bulkCreate(images)
                    .then(() => res.redirect('/admin'))
                    .catch(error => console.log(error))
                }else {
                    ProductImages.create({
                        image: 'default-image.jpg',
                        product_id: product.id
                    })
                    .then(() => {res.redirect('/admin')})
                    .catch(error => console.log(error))
                }
            })
            .catch(error => console.log(error))
        } else {
            let allCategories = Categories.findAll();
            let allSubcategories = Subcategories.findAll();
            Promise.all([allCategories, allSubcategories])
            .then(([categories, subcategories]) => {
                res.render('admin/products/productCreate', {
                    categories,
                    subcategories,
                    errors: errors.mapped(),
                    old: req.body,
                    session: req.session
                })
            })
            .catch(error => console.log(error))
        }
    },
    
    edit:(req,res)=>{
        let productId = Number(req.params.id);
        const productPromise = Products.findByPk(productId);
        const categoriesPromise = Categories.findAll();
        const subcategoriesPromise = Subcategories.findAll();
        Promise.all([productPromise, categoriesPromise, subcategoriesPromise])
        .then(([product, categories, subcategories])=>{
            res.render('admin/products/ProductEdit', {
                product,
                categories, 
                subcategories,
                session: req.session
            })
        })
        .catch(error => console.log(error)) 		
    },
    
    update: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            const {name, price, category, subcategory, description, discount} = req.body
            Products.update({
                name, 
                price, 
                description,
                discount, 
                subcategory_id: subcategory,
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then((result) => {
                ProductImages.findAll({
                    where: {
                        product_id: req.params.id
                    }
                })
                .then((images) => {
                    images.forEach((image) => {
                        fs.existsSync('./public/img/products/', image.image)
                        ? fs.unlinkSync(`${'./public/img/products/'}${image.image}`)
                        : console.log('No se encontro el archivo')
                    })
                    ProductImages.destroy({
                        where: {
                            product_id: req.params.id
                        }
                    })
                    .then(() => {
                        ProductImages.create({
                            image: req.file ? req.file.filename : 'default-image.jpg',
                            product_id: req.params.id
                        })
                        .then(() => {
                            res.redirect('/admin')
                        })
                    })
                })
                .catch(error => console.log(error))
            })
            
        }else{
            let productId = Number(req.params.id);
            const productPromise = Products.findByPk(productId);
            const categoriesPromise = Categories.findAll();
            const subcategoriesPromise = Subcategories.findAll();
            Promise.all([productPromise, categoriesPromise, subcategoriesPromise])
            .then(([product, categories, subcategories])=>{
                res.render('admin/products/ProductEdit', {
                    product,
                    categories, 
                    subcategories,
                    errors: errors.mapped(),
                    old: req.body,
                    session: req.session
                })
            })
            .catch(error => console.log(error)) 
        }
        
    },
    
    destroy : (req, res) => {
        ProductImages.findAll({
            where: {
                product_id : req.params.id
            }
        })
        .then((images) => {
            images.forEach((image) => {
                fs.existsSync('./public/img/products/', image.image)
                ? fs.unlinkSync(`${'./public/img/products/'}${image.image}`)
                : console.log('No se encontro el archivo')
            })
            ProductImages.destroy({
                where: {
                    product_id: req.params.id
                }
            })
            .then((result) => {
                Products.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(res.redirect('/admin'))
                .catch(error => console.log(error))		
            })
            .catch(error => console.log(error))		
        })
        .catch(error => console.log(error))		
    }
}

module.exports = controller