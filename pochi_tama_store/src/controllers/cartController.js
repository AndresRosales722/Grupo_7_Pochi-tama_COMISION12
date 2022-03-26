const db = require('../database/models');

const productVerify = ( carrito, id) => {

    let index = -1

    for (let i = 0; i < carrito.length; i++) {
        
        if (carrito[i].id === +id) {
            index = i
            break
        }
        
    }

    return index

}

module.exports = {
    show: async (req,res) => {
        if (!req.session.cart) {
            return res.status(500).json({
                ok:false,
                msg:'comuniquese con el administrador'
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
        try {

            let product = await db.Product.findByPk(req.params.id,{
                include: [
                    {association: 'productImages',
                        attributes: ['image']
                    }
                ]
            })

            const {id,name,price,discount} = product
    
                let item = {
                    id,
                    name,
                    price,
                    discount,
                    image: product.productImages[0].image,
                    amount: 1,
                    total: price 
                }

            if (req.session.cart.length === 0) {
                
                let order = await db.Order.create({
                    user_id: req.session.user.id,
                    status: 'pending'
                })

                item = {
                    ...item,
                    order_id: order.id
                }
                
                await db.Order_items.create({
                    order_id: order.id,
                    product_id: item.id,
                    quantity:1,
                    user_id: order.user_id,
                }) 

                req.session.cart.push(item)

            }else{

                let index = productVerify(req.session.cart,req.params.id)

                let order = await db.Order.findOne({
                    where:{
                        user_id: req.session.user.id,
                        status: 'pending'
                    }
                })

                if (index === -1) {
                    item = {
                        ...item,
                        order_id : order.id
                    }

                    req.session.cart.push(item)

                    await db.Order_items.create({
                        order_id: order.id,
                        product_id: item.id,
                        quantity:1,
                        user_id: order.user_id,
                    })
                }else{

                    let product = req.session.cart[index]
                    product.amount++
                    product.total = product.amount * product.price
                    req.session.cart[index] = product

                    await db.Order_items.update(
                        {
                            quantity: product.amount
                        },
                        {
                            where: {
                                order_id: product.order_id,
                                product_id : product.id
                            }
                        }
                    )
                }

            }

            let response = {
                ok:true,
                meta: {
                    total: req.session.cart.length
                },
                data: req.session.cart
            }
    
            return res.status(200).json(response)

        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    },
    remove : async (req,res) => {

        try {
            
            let index = productVerify(req.session.cart,req.params.id)
            let product = req.session.cart[index]

            if(product.amount > 1) {

                product.amount--
                product.total = product.amount * product.price
                req.session.cart[index] = product

            }else{

                req.session.cart.splice(index,1)

            }

            let response = {
                ok:true,
                meta: {
                    total: req.session.cart.length
                },
                data: req.session.cart
            }
    
            return res.status(200).json(response)

        } catch (error) {
            
        }
    }
}