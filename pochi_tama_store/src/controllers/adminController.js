let controller = {
    //aca hay que administrar los productos con metodos array//
    admin:(req,res)=>{
        res.render('administrador')
    },
    productCreate:(req,res)=>{
        res.render('productCreate')
    },
    productEdit:(req,res)=>{
        res.render('productEdit')
    },
    productAdmin:(req,res)=>{
        res.render('productAdmin')
    }
}



module.exports = controller