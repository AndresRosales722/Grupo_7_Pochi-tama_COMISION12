function qs (element) {
    return document.querySelector(element)
}

window.addEventListener('load', function(){
    let $inputName = qs('#name'),
    $nameError = qs('#nameError'),
    $inputPrice = qs('#price'),
    $priceError = qs('#priceError'),
    $category = qs('#category'),
    $categoryError = qs('#categoryError'),
    $subcategory = qs('#subcategory'),
    $subcategoryError = qs('#subcategoryError'),
    $description = qs('#description'),
    $descriptionError = qs('#descriptionError'),
    $image = qs('#image'),
    $imageError =qs('#imageError'),
    $form = qs('#form'),
    $submitError = qs('#submit-error')
    
    let regExImage = /(.jpg|.jpeg|.png|.gif)$/i;
    let validationsErrors = false

    $inputName.addEventListener('blur', function(){
        switch(true) {
            case!$inputName.value.trim():
                $nameError.innerHTML = 'El nombre del producto es obligatorio'
                $inputName.classList.add('invalid');
                validationsErrors = true
                break;
            case $inputName.value.trim().length < 5:
                $nameError.innerHTML = 'El nombre del producto debe tener mas de 5 caracteres';
                $inputName.classList.remove('valid')
                $inputName.classList.add('invalid')
                validationsErrors = true;
                break;
            default:
                $inputName.classList.remove('invalid');
                $inputName.classList.add('valid');
                $nameError.innerHTML = '';
                validationsErrors = false
                break;
        }
    })

    $inputPrice.addEventListener('blur', function(){
        switch(true){
            case !$inputPrice.value.trim():
                $priceError.innerHTML = 'Debe ingresar un precio al producto';
                $inputPrice.classList.add('invalid');
                validationsErrors = true
                break;
            default:
                $inputPrice.classList.remove('invalid');
                $inputPrice.classList.add('valid');
                $priceError.innerHTML = '';
                break;
        }
    })

    $category.addEventListener('blur', function(){
        switch(true) {
            case!$category.value.trim():
                $categoryError.innerHTML = 'Debe elegir una categoría'
                $category.classList.add('invalid')
                validationsErrors = true
                break;
            default:
                $category.classList.remove('invalid');
                $category.classList.add('valid');
                $categoryError.innerHTML = '';
                validationsErrors = false
                break;
        }
    })

    $subcategory.addEventListener('blur', function(){
        switch(true) {
            case!$subcategory.value.trim():
                $subcategoryError.innerHTML = 'Debe elegir una categoría'
                $subcategory.classList.add('invalid')
                validationsErrors = true
                break;
            default:
                $subcategory.classList.remove('invalid');
                $subcategory.classList.add('valid');
                $subcategoryError.innerHTML = '';
                validationsErrors = false
                break;
        }
    })

    $description.addEventListener('blur', () => {
        switch (true) {
            case !$description.value.trim():
                $descriptionError.innerHTML = 'Debes agregar una descripción al producto';
                $description.classList.add('invalid')
                validationsErrors = true
                break;
            case $description.value.trim().length < 20:
                $descriptionError.innerHTML = 'La descripción del producto debe tener al menos 20 caracteres';
                $description.classList.add('invalid')
                validationsErrors = true;
                break;
            default:
                $description.classList.remove('invalid');
                $description.classList.add('valid');
                $descriptionError.innerHTML = '';
                break;
        }
    })

    $image.addEventListener('change', ()=>{
        if (regExImage.exec($image.value)) {
            const file = $image.files[0];
            const imagen = URL.createObjectURL(file);
            $image.classList.remove('invalid');
            $image.classList.add('valid');
            $imageError.innerHTML = '';
            validationsErrors = false;
        } else {
            $image.classList.add('invalid');
            $imageError.innerHTML = 'Solo extensiones .jpg .jpeg .png .gif'
        }
    })

    $form.addEventListener('submit', function(event){
        event.preventDefault()
        
        let error = false;
        let elementsForm = this.elements;

        for (let index = 0; index < elementsForm.length - 1; index++){
            if(elementsForm[index].value == ''
            && elementsForm[index].type !== 'file'){
                elementsForm[index].classList.add('invalid');
                $submitError.innerHTML = 'Los campos señalados son obligatorios'
                error = true
            }
        }

        if(!error && !validationsErrors) {
            $form.submit()
        }

    })


})