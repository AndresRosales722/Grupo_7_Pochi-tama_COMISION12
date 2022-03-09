window.onload = () => {

    let url = new URL(`http://localhost:3000/api/v1/products/?page=0&size=5`)
    console.log(url.search);
    let urlParams = new URLSearchParams(url.search);
    const filter = document.querySelector('#filter');
    const tbody = document.querySelector('#container-result');
    const template = document.querySelector('#template').content;
    const fragment = document.createDocumentFragment();
    const msg = document.querySelector('#msg-0');
    const sizes = document.querySelector('#size');
    const pagePrevious = document.querySelector('#page_previous');
    const pageNext = document.querySelector('#page_next');
    const pagesLink = document.querySelectorAll('.page-link');


    console.log(template);


    filter.addEventListener('change', (e) => {
        //console.log(e.target.name);

        if(e.target.value.trim().length != 0){

            if(urlParams.has(e.target.name)){

                if(e.target.name != 'name' && e.target.value == 0){
                    urlParams.delete(e.target.name);
                    tbody.innerHTML = '';
                    traerDatos(urlParams);
                    
                }else{
                    urlParams.set(e.target.name, e.target.value);
                }
            }else{
                urlParams.append(e.target.name, e.target.value);
            }
            console.log(urlParams.toString());
            tbody.innerHTML = '';
            traerDatos(urlParams);
            
        }else{
            console.log('esta vacio');
            if(urlParams.has(e.target.name)){
                urlParams.delete(e.target.name);
                tbody.innerHTML = '';
                traerDatos(urlParams);
            }
            urlParams.delete(e.target.value);
        }
        
        
        console.log(urlParams.toString());
        
    })
    
    sizes.addEventListener('change', (e) => {
        urlParams.set(e.target.name, e.target.value);
        tbody.innerHTML = '';
        traerDatos(urlParams);
    })
    

    pagesLink.forEach((link) => {
        link.addEventListener('click', (e)=>{
            e.preventDefault();
            let newUrlParams = link.search.slice(1);
            tbody.innerHTML = '';
            traerDatos(newUrlParams)
        })
    })
    

    const traerDatos = async (params) =>{

        console.log(`http://localhost:3000/api/v1/products/?${params}`);
        try{
            console.log('Se realizó una request');
            let response = await fetch(`http://localhost:3000/api/v1/products/?${params}`);
            let result = await response.json();

            if(result.info.count != 0){

                msg.classList.add('d-none');

                result.result.forEach((product) => {

                    template.querySelector('#id').textContent = product.id;
                    template.querySelector('#name').textContent = product.name;
                    template.querySelector('#category').textContent = product.subcategories.category.name;
                    template.querySelector('#subcategory').textContent = product.subcategories.name;
                    template.querySelector('#price').textContent = product.price;
                    template.querySelector('#discount').textContent = product.discount;
                    template.querySelector('#btn-edit').href = `/admin/${product.id}/edit`;
                    template.querySelector('#btn-delete').action = `/admin/${product.id}?_method=DELETE`;
                    const clone = template.cloneNode(true)
                    fragment.appendChild(clone)
                });
                tbody.appendChild(fragment)

                if(result.info.previous != null){
                    pagePrevious.href = result.info.previous;
                    if(pagePrevious.parentNode.classList.contains('disabled')){
                        pagePrevious.parentNode.classList.remove('disabled')
                    }
                }else{
                    pagePrevious.parentNode.classList.add('disabled')
                }

                if(result.info.next != null){
                    pageNext.href = result.info.next;
                    if(pageNext.parentNode.classList.contains('disabled')){
                        pageNext.parentNode.classList.remove('disabled')
                    }
                }else{
                    pageNext.parentNode.classList.add('disabled')
                }

            }else{
                msg.classList.remove('d-none')
            }

        }catch(error){
            console.log(error);
        }

    }
    traerDatos(urlParams)

}