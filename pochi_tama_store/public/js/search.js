document.addEventListener("keyup", e =>{
    
    let inputSearch = document.querySelector('#buscador') 
    
    let productSearch = Array.from(document.querySelectorAll('#productos'))
    
    if(e.target.matches('#buscador')){
        productSearch.forEach(product => {

            product.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ? product.classList.remove('filtro')
            : product.classList.add('filtro')
        })
    }

})