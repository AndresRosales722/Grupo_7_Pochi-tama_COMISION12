function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', function () {
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
        $form = qs('#form'),
        $submitError = qs('#submit-error'),
        $file = qs('#formFile'),
        $fileErrors = qs('#fileErrors'),
        $imgPreview = qs('#img-preview')

    let regExImage = /(.jpg|.jpeg|.png|.gif)$/i;
    let validationsErrors = false

    $inputName.addEventListener('blur', function () {
        switch (true) {
            case !$inputName.value.trim():
                $nameError.innerHTML = 'Debe ingresar un nombre al producto'
                $inputName.classList.add('invalid');
                $inputName.classList.remove('valid')
                validationsErrors = true
                break;
            case $inputName.value.trim().length < 4:
                $nameError.innerHTML = 'El nombre del producto debe tener mas de 5 caracteres';
                $inputName.classList.remove('valid')
                $inputName.classList.add('invalid')
                validationsErrors = true;
                break;
            default:
                $inputName.classList.remove('invalid');
                $inputName.classList.add('valid');
                $nameError.innerHTML = '';
                break;
        }
    })

    $inputPrice.addEventListener('blur', function () {
        switch (true) {
            case !$inputPrice.value.trim():
                $priceError.innerHTML = 'Debe ingresar un precio al producto';
                $inputPrice.classList.remove('valid')
                $inputPrice.classList.add('invalid');
                validationsErrors = true
                break;
            case $inputPrice.value.trim().length < 3:
                $priceError.innerHTML = 'El precio del producto debe tener mas de 2 caracteres';
                $inputPrice.classList.remove('valid')
                $inputPrice.classList.add('invalid')
                validationsErrors = true;
                break;
            default:
                $inputPrice.classList.remove('invalid');
                $inputPrice.classList.add('valid');
                $priceError.innerHTML = '';
                break;
        }
    })

    $category.addEventListener('blur', function () {
        switch (true) {
            case !$category.value.trim():
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

    $subcategory.addEventListener('blur', function () {
        switch (true) {
            case !$subcategory.value.trim():
                $subcategoryError.innerHTML = 'Debe elegir una subcategoria'
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
                $descriptionError.innerHTML = 'Debe agregar una descripción al producto';
                $description.classList.remove('valid')
                $description.classList.add('invalid')
                validationsErrors = true
                break;
            case $description.value.trim().length < 20:
                $descriptionError.innerHTML = 'La descripción del producto debe tener al menos 20 caracteres';
                $description.classList.remove('valid')
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

    $form.addEventListener('submit', function (event) {
        event.preventDefault()

        let error = false;
        let elementsForm = this.elements;

        for (let index = 0; index < elementsForm.length - 1; index++) {
            if (elementsForm[index].value == '' &&
                elementsForm[index].type !== 'file') {
                elementsForm[index].classList.add('invalid');
                $submitError.innerHTML = 'Los campos señalados son obligatorios'
                error = true
            }
        }

        if (!error && !validationsErrors) {
            $form.submit()
        }

    })


    $file.addEventListener('change',function fileValidation(){
        let filePath = $file.value
        let allowedExtensions = /(.jpg|.hpeg|.png|.gif|.web)$/i
    
        if (!allowedExtensions.exec(filePath)){
          $fileErrors.innerHTML = 'solo extenciones (.jpg - .jpeg - .png - .gif)'
          $file.value = ''
          $imgPreview.innerHTML = ''
          return false
        }
      })


})