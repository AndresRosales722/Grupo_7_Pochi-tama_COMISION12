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
    detail:(req,res)=>{
    let productId = +req.params.id
    let product = products.find(product => product.id === productId)

        res.render('products/productdetail',{
            product,
            toThousand
        })
    },
    
    cart:(req,res)=>{
        res.render('products/productCart')
    },

    
    create:(req,res)=>{
        res.render('productCreate')
    },


    store:(req,res)=>{
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
			image: "default-image.png"
		}

			products.push(newProduct)

			writeJson(products)

			res.redirect('/products')
    },
    edit:(req,res)=>{
        let productId = +req.params.id
        let productToEdit = products.find(product => product.id === productId)

        res.render('productEdit',{
            product: productToEdit
        })
    },

    update:(req,res)=>{
        res.render('')
    },

    
}



module.exports = controller