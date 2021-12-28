const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let controller = {
    index:(req,res)=>{
        res.render('index',{
            products,
            toThousand,
            session: req.session
        })
    }
}



module.exports = controller