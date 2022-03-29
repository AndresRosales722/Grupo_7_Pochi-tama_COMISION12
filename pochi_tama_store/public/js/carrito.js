console.log('carrito conectado')

const $ = (id) => document.getElementById(id)

const carrito = $('carrito')

let total = document.querySelector('#total')

const getCarrito = async () => {

  try {
      const response = await fetch('/api/cart/show')
      const result = await response.json()

      if (result.ok) {

          cargarTabla(result.data)
      }

  } catch (error) {
      console.error(error);
  }

}



const addItem = async (id) => {

  try {
      const response = await fetch(`/api/cart/${id}`, {
          method: 'POST'
      })
      const result = await response.json()

      if (result.ok) {
          cargarTabla(result.data)
      }

  } catch (error) {
      console.error(error);
  }

}

const removeItem = async (id) => {

    try {

          const response = await fetch(`/api/cart/${id}`, {
              method: 'DELETE'
          })
          const result = await response.json()

          if (result.ok) {
              cargarTabla(result.data)
          }
      } catch (error) {
          console.error(error)
      }
}

const removeAllItem = async (id) => {
    try {
        const response = await fetch(`/api/cart/${id}`, {
            method: 'DELETE'
        })
        const result = await response.json()

        if (result.ok) {
            cargarTabla(result.data)
        }
    } catch (error) {
        console.error(error)
    }
}

const emptyCart = async () =>{
        try {
            const response = await fetch(`/api/cart/empty`, {
                method: 'DELETE'
            })
            const result = await response.json()
    
            if (result.ok) {
                cargarTabla(result.data)
            }
        } catch (error) {
            console.error(error)      
        }
}


const cargarTabla = (data) => {

      carrito.innerHTML = null
      let totalCart = 0
      data.forEach(({id,amount,image,name,price,total}) => {
          let item = `
          <tr>
          <td><img src="/img/products/${image}" class="w-25" /> </td>
          <td class="name-ta">${name}</td>
          <th scope="row">
          <button class="restar" onclick="removeItem('${id}')" ><i class="fas fa-minus"></i></button>
          <span>${amount}</span>
          <button class="agregar" onclick="addItem('${id}')" ><i class="fas fa-plus"></i></button>
          </th>
          <td class="price-ta">${price}</td>
          <td class="total-ta">${total}</td>
          <td class="basura-ta"><button onclick="removeAllItem('${id}')"><i class="fas fa-trash"></i></button></td>
        </tr>
          `
        totalCart = totalCart+total
        carrito.innerHTML += item

      });
      let totales = `
      <span class="s-total">Total:</span>
      <span>${totalCart}</span>
        `
    total.innerHTML = totales

}

carrito && getCarrito()
