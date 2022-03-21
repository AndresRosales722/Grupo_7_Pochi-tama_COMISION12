console.log('carrito conectado')

const getCarrito = async () => {

    try {
        const response = await fetch('/products/productCart')
        const result = await response.json()


        if (result.ok) {
            console.log(result);
        }

    } catch (error) {
        console.error(error);
    }
}

getCarrito()