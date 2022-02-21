document.addEventListener("keyup", e =>{
    
    let inputSearch = document.querySelector('#buscador') 
    
    let productSearch = Array.from(document.querySelectorAll('.producto'))
    
    inputSearch.addEventListener('keyup', (e) => {

        if(e.key === "Escape"){
            e.target.value = ""
        }

        productSearch.forEach(product => {        
            (product.textContent.toLowerCase().trim().includes(e.target.value.toLowerCase().trim))
                ? product.classList.remove('filtro')
                : product.classList.add('filtro')   
        })

    })
})