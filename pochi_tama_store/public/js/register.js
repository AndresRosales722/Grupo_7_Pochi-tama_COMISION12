function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', function () {

    let $inputName = qs('#name'),
    $form = qs('#form'),
    $nameErrors = qs('#nameErrors'),
    $inputLastName = qs('#lastName'),
    $lastNameErrors = qs('#lastNameErrors'),
    $email = qs('#email'),
    $emailErrors = qs('#emailErrors'),
    $pass = qs('#pass'),
    $passErrors = qs('#passErrors'),
    $pass2 = qs('#pass2'),
    $pass2Errors = qs('#pass2Errors'),
    $terms = qs('#terms'),
    $termsErrors = qs('#termsErrors'),
    $labelTerms = qs('#labelTerms'),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExDNI = /^[0-9]{7,8}$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;


    let validationsErrors = false

    $inputName.addEventListener('blur', function(){
        switch (true) {
            case !$inputName.value.trim():
                $nameErrors.innerHTML = 'El campo nombre es obligatorio'
                $inputName.classList.add('invalid')
                $inputName.classList.remove('valid')
                validationsErrors = true
                break;
            case !regExAlpha.test($inputName.value):
                $nameErrors.innerHTML = 'Ingrese un nombre valido'
                $inputName.classList.add('invalid')
                $inputName.classList.remove('valid')
                validationsErrors = true
                break;
            default:
                $inputName.classList.remove('invalid')
                $inputName.classList.add('valid')
                $nameErrors.innerHTML = ""
                validationsErrors = false
                break;
        }
    })

    $inputLastName.addEventListener('blur', function(){
        switch (true) {
            case !$inputLastName.value.trim():
                $lastNameErrors.innerHTML = 'El campo apellido es obligatorio'
                $inputLastName.classList.add('invalid')
                $inputLastName.classList.remove('valid')
                validationsErrors = true
                break;
            case !regExAlpha.test($inputLastName.value):
                $lastNameErrors.innerHTML = 'Ingrese un apellido valido'
                $inputLastName.classList.add('invalid')
                $inputLastName.classList.remove('valid')
                validationsErrors = true
                break;
            default:
                $inputLastName.classList.remove('invalid')
                $inputLastName.classList.add('valid')
                $lastNameErrors.innerHTML = ""
                validationsErrors = false
                break;
        }
    })

    $email.addEventListener('blur', function(){
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerHTML = 'El campo email es obligatorio'
                $email.classList.add('invalid')
                $email.classList.remove('valid')
                validationsErrors = true
                break;
            case !regExEmail.test($email.value):
                $emailErrors.innerHTML = 'Debe ingresar un email válido'
                $email.classList.add('invalid')
                $email.classList.remove('valid')
                validationsErrors = true
                break;    
            default:
                $email.classList.remove("invalid");
                $email.classList.add('valid')
                $emailErrors.innerHTML = ""
                validationsErrors = false
                break;
        }
    })


    $pass.addEventListener('blur', function(){
        switch (true) {
            case !$pass.value.trim():
                $passErrors.innerHTML = 'El campo contraseña es obligatorio'
                $pass.classList.add('invalid')
                $pass.classList.remove('valid')
                validationsErrors = true
                break;
            case !regExPass.test($pass.value):
                $passErrors.innerHTML = 'La contraseña debe tener: entre 6 o 12 caracteres, al menos una mayúscula, una minúscula y un número';
                $pass.classList.add('invalid')
                $pass.classList.remove('valid')
                validationsErrors = true
                break;    
            default:
                $pass.classList.remove("invalid");
                $pass.classList.add('valid')
                $passErrors.innerHTML = ""
                validationsErrors = false
                break;
        }
    })


    $pass2.addEventListener('blur', function(){
        switch (true) {
            case !$pass2.value.trim():
                $pass2Errors.innerHTML = 'Debe reingresar su contraseña'
                $pass2.classList.add('invalid')
                $pass2.classList.remove('valid')
                validationsErrors = true
                break;
            case $pass2.value !== $pass.value:
                $pass2Errors.innerHTML = 'Las contraseña no coinciden';
                $pass2.classList.add('invalid')
                $pass2.classList.remove('valid')
                validationsErrors = true
                break;    
            default:
                $pass2.classList.remove("invalid");
                $pass2.classList.add('valid')
                $pass2Errors.innerHTML = ""
                validationsErrors = false
                break;
        }
    })



    $terms.addEventListener('click', function (){
        $terms.value = "on"
        $terms.classList.toggle('valid')
        $terms.classList.remove('invalid')
        $labelTerms.classList.toggle('label-valid')
        $labelTerms.classList.remove('label-invalid')
        $termsErrors.innerHTML = ""
    })


    $form.addEventListener('submit', function(e) {
        e.preventDefault()
        
        let error = false
        let elementsForm = this.elements

        console.log(elementsForm)

        for(let index = 0; index < elementsForm.length-3; index++){
            if(elementsForm[index].value == ""
            && elementsForm[index].type !== 'file'
            ){
                elementsForm[index].classList.add('invalid')
                submitErrors.innerHTML = 'Los campos señalados son obligatorios'
                error = true
            }
        }

        if(!$terms.checked){
            $terms.classList.add('valid')
            $termsErrors.innerHTML = 'Debes aceptar los terminos y condiciones'
            $labelTerms.classList.remove('label-valid')
            $labelTerms.classList.add('label-invalid')
            error = true
        }

        if(!error && !validationsErrors){
            $form.submit()
        }
        
    })


})

