document.addEventListener("keyup", e=>{
    
    let buscador = document.querySelector('#buscador') 
    
    let producto = Array.from(document.querySelectorAll('.producto'))
    
    buscador.addEventListener('keyup', (e) => {
        

        if(e.key === "Escape"){
            e.target.value = ""
        }

        producto.forEach(element => {
            if(element.textContent.toLocaleLowerCase().includes(e.target.value)){
                element.classList.remove('filtro')
            }else{
                element.classList.add('filtro')
            }
        })

    })
})