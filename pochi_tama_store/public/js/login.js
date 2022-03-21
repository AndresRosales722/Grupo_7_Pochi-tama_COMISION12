function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', function () {

    let $email = qs('#email'),
    $emailErrors = qs('#emailErrors'),
    $pass = qs('#pass'),
    $passErrors = qs('#passErrors'),
    $form = qs('#form'),
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;


    let validationsErrors = false


    $email.addEventListener('blur', function(){
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerHTML = 'El campo email es obligatorio <i id="warning" class="fas fa-engine-warning"></i>'
                $email.classList.add('invalid')
                $email.classList.remove('valid')
                validationsErrors = true
                break;
            case !regExEmail.test($email.value):
                $emailErrors.innerHTML = 'Debe ingresar un email válido <i id="warning" class="fas fa-engine-warning"></i>'
                $email.classList.add('invalid')
                $email.classList.remove('valid')
                validationsErrors = true
                break;    
            default:
                $email.classList.remove("invalid");
                $email.classList.add('valid')
                $emailErrors.innerHTML = '<i class="fas fa-check-circle"></i>'
                validationsErrors = false
                break;
        }
    })


    $pass.addEventListener('blur', function(){
        switch (true) {
            case !$pass.value.trim():
                $passErrors.innerHTML = 'El campo contraseña es obligatorio <i id="warning" class="fas fa-engine-warning"></i>'
                $pass.classList.add('invalid')
                $pass.classList.remove('valid')
                validationsErrors = true
                break;
            case !regExPass.test($pass.value):
                $passErrors.innerHTML = 'La contraseña debe tener: entre 6 o 12 caracteres, al menos una mayúscula, una minúscula y un número <i id="warning" class="fas fa-engine-warning"></i>';
                $pass.classList.add('invalid')
                $pass.classList.remove('valid')
                validationsErrors = true
                break;    
            default:
                $pass.classList.remove("invalid");
                $pass.classList.add('valid')
                $passErrors.innerHTML = '<i class="fas fa-check-circle"></i>'
                validationsErrors = false
                break;
        }
    })



    $form.addEventListener('submit', function(e) {
        e.preventDefault()
        
        let error = false
        let elementsForm = this.elements

        console.log(elementsForm)

        for(let index = 0; index < elementsForm.length-3; index++){
            if(elementsForm[index].value == ""
            ){
                elementsForm[index].classList.add('invalid')
                $pass.classList.add('invalid')
                submitErrors.innerHTML = 'Los campos señalados son obligatorios'
                error = true
            }
        }


        if(!error && !validationsErrors){
            $form.submit()
        }
        
    })


})