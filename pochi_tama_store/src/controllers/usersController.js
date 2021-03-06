const { validationResult } = require ('express-validator') // Requerimos el metodo validationResult de express-validator
const bcrypt = require ('bcryptjs')
const db = require('../database/models')
const Users = db.User



let controller = {
    login: (req, res) => {
        res.render('users/login',{
            session: req.session
        })
    },
    processLogin: (req,res)=>{
        let errors = validationResult(req)

        if(errors.isEmpty()){
            Users.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((user) => {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    avatar: user.avatar,
                    rol: user.rol
                }
    
                if (req.body.remember) {
                    const TIME_IN_MILISECONDS = 900000
                    res.cookie("userPochiTama",req.session.user,{
                        expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                        httpOnly: true,
                        secure: true
                    })
                }
    
                req.session.cart = []

                db.Order.findOne({
                    where:{
                        user_id: req.session.user.id,
                        status: 'pending'
                    },
                    include:[
                        {
                            association: 'orderItems',
                            include: [
                                {
                                    association: 'products',
                                    include: ['productImages']
                                }
                            ]
                        }
                    ]
                }).then(order => {
                    if (order) {
                        order.orderItems.forEach(item => {
                            let product = {
                                id: item.product_id,
                                name: item.products.name,
                                price: item.products.price,
                                discount:item.products.discount,
                                image: item.products.productImages[0].image,
                                amount: +item.quantity,
                                total: +item.products.price * item.quantity ,
                                order_id: order.id
                            }
                            req.session.cart.push(product)
                        });
                    }
                    res.redirect('/')
                })
    
    
            }).catch(error => console.log(error))

        }else{
            res.render('users/login',{
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    register: (req, res) => {
        res.render('users/register',{
            session: req.session
        })
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);
       
        if(errors.isEmpty()){
            let { name, last_name, email, pass1 } = req.body
            Users.create({
                name,
                last_name,
                email,
                pass: bcrypt.hashSync(pass1, 10),
                avatar: req.file ? req.file.filename : 'default-image.png',
                rol: 0
            })
            .then(() => {
                res.redirect('/users/login')
            })

        }else{
            res.render('users/register', {
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }

    },
    logout:(req,res)=>{
        req.session.destroy()
        if(req.cookies.userPochiTama){
            res.cookie('userPochiTama',"",{ maxAge: -1 })
        }
        res.redirect('/')
    },

    profile:(req,res)=>{ console.log(req.session.user)
        Users.findByPk(req.session.user.id, {
            include: [{association: 'addresses'}]
        })
        .then((user) => {
            res.render('users/userProfile',{
                user,
                session:req.session
            })
        })
    },
}


module.exports = controller