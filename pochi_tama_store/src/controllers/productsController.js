const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = dataBase => fs.writeFileSync(productsFilePath,JSON.stringify(dataBase), 'utf-8')


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


let controller = {

    detail:(req,res)=>{
    let productId = +req.params.id
    let product = products.find(product => product.id === productId)

        res.render('products/detail',{
            product,
            toThousand
        })
    },
    
    cart:(req,res)=>{
        res.render('products/productCart')
    }

}



module.exports = controller