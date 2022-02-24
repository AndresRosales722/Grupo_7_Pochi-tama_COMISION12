function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', function () {

    /* Elementos seleccionados */

    let $btnSwitch = qs('#switch')
    let $body = qs('body')
    let $bgFooter = qs('#bg-footer')
    let $card = qs('#card-bg')
    let $header = qs('#header')
    let $header2 = qs('#navigation-bar-desktop')


    $btnSwitch.addEventListener('click', () => {
        $body.classList.toggle('dark')
        $header.classList.toggle('dark-header')
        $header2.classList.toggle('dark-header2')
        $bgFooter.classList.toggle('dark-footer')
        /* $card.classList.toggle('dark-card') */

        if($body.classList.contains('dark')){
            localStorage.setItem('dark-mode', 'true')
        } else {
            localStorage.setItem('dark-mode', 'false')
        }

    })
    
    if(localStorage.getItem('dark-mode','dark-footer','dark-header','dark-header2') === 'true'){
        $body.classList.add('dark')
        $bgFooter.classList.add('dark-footer')
        $header.classList.add('dark-header')
        $header2.classList.add('dark-header2')
    } else {
        $body.classList.remove('dark')
        $bgFooter.classList.remove('dark-footer')
        $header.classList.remove('dark-header')
        $header2.classList.remove('dark-header2')
    }

})