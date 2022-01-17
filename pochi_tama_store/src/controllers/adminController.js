const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = dataBase => fs.writeFileSync(productsFilePath,JSON.stringify(dataBase), 'utf-8')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let {validationResult} = require('express-validator')

let controller = {
    
	index:(req,res)=>{
        res.render('products/products',{      
            products,
            toThousand,
			session: req.session
        })
    },

    create:(req,res)=>{
        res.render('admin/products/productCreate',{
			session: req.session
		})
    },

    store:(req,res)=>{
		let errors = validationResult(req)

		if (errors.isEmpty()) {
			const {name,price,discount,category,description} = req.body

		let lastId = 1

		products.forEach(product => {
			if(product.id > lastId){
				lastId = product.id
			}
		});

		let newProduct ={
			id : lastId + 1, 
			name,
			price,
			discount,
			description,
			category,
			image: req.file ? req.file.filename :"default-image.png"
		}

			products.push(newProduct)

			writeJson(products)

			res.redirect('/admin')
		} else {
			res.render('admin/products/productCreate',{
				errors: errors.mapped(),
				old: req.body,
				session: req.session
			})
		}   
    },

    edit:(req,res)=>{
        let productId = +req.params.id
        let productToEdit = products.find(product => product.id === productId)

        res.render('admin/products/productEdit',{
            product: productToEdit,
			session: req.session
        })
    },

    update: (req, res) => {
		let errors = validationResult(req)
		if (errors.isEmpty()) {
			
		} else {
			
		}
		let productId = +req.params.id

		const {name,price,discount,category,description} = req.body

		products.forEach(product =>{
			if(product.id === productId){
				product.id = product.id,
				product.name = name,
				product.price = +price,
				product.discount = discount,
				product.description = description
				if(req.file){
					if(fs.existsSync("./public/img/imagenes home/", product.image)){
						fs.unlinkSync(`./public/img/imagenes home/${product.image}`)
					}else{
						console.log("no encontre el archivo")
					}
					product.image = req.file.filename
				}else{
					product.image = product.image
				}
			}
		})

		writeJson(products)

		res.redirect("/admin")

    },

    destroy : (req, res) => {
		let productId = +req.params.id	
		products.forEach(product => {
			if(product.id === productId){
				if(fs.existsSync("./public/img/imagenes home/", product.image)){
					fs.unlinkSync(`./public/img/imagenes home/${product.image}`)
				}else{
					console.log("no encontre el archivo")
				}
				
				let productToDestroyIndex = products.indexOf(product)
				if (productToDestroyIndex !== -1) {
					products.splice(productToDestroyIndex, 1)
				}else{
					console.log('no encontre el producto')
				}	
			}
		})

		writeJson(products)
		res.redirect("/admin")

    }
}



module.exports = controller