const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = dataBase => fs.writeFileSync(productsFilePath,JSON.stringify(dataBase), 'utf-8')


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let controller = {
    
	index:(req,res)=>{
        res.render('products/products',{      
            products,
            toThousand
        })
    },

    create:(req,res)=>{
        res.render('productCreate')
    },

    store:(req,res)=>{
        const {name,price,discount,category,description} = req.body

		res.send(req.file)

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
			image: "default-image.png"
		}

			products.push(newProduct)

			writeJson(products)

			res.redirect('/admin')
    },

    edit:(req,res)=>{
        let productId = +req.params.id
        let productToEdit = products.find(product => product.id === productId)

        res.render('productEdit',{
            product: productToEdit
        })
    },

    update: (req, res) => {
		let productId = +req.params.id

		const {name,price,discount,category,description} = req.body

		products.forEach(product =>{
			if(product.id === productId){
				product.id = product.id,
				product.name = name
				product.price = price
				product.discount = discount
				product.description = description
				product.image = product.image
			}
		})

		writeJson(products)

		res.redirect("/admin")

    },

    destroy : (req, res) => {
		let productId = +req.params.id
		

		products.forEach(product => {
			if(product.id === productId){
				let productToDestroyIndex = products.indexOf(product)
				productToDestroyIndex !== -1 ?
				products.splice(productToDestroyIndex,  1) :
			    console.log('no encontre el producto')
			}
		})

		writeJson(products)
		res.redirect("/admin")

    }
}



module.exports = controller