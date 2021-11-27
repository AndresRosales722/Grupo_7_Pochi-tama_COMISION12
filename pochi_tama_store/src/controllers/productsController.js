let controller = {

    cart:(req,res)=>{
        res.render('products/productCart')
    },
    detail:(req,res)=>{
        res.render('products/productdetail')
    }
    
}



module.exports = controller