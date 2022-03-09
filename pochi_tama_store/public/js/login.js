function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', function () {

    let $email = qs('#email'),
    $emailErrors = qs('#emailErrors'),
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;






})