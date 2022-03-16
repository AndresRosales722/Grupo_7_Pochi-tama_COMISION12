function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', function () {

    let $btnSwitch = qs('#switch')
    let $body = qs('body')

    $btnSwitch.addEventListener('click', () => {
        $body.classList.toggle('dark')
        $btnSwitch.classList.toggle('active')
    
        
        if($body.classList.contains('dark') && $btnSwitch.classList.contains('active') ){
            localStorage.setItem('dark-mode', 'true')
            localStorage.setItem('active', 'true')
        } else {
            localStorage.setItem('dark-mode', 'false')
            localStorage.setItem('active', 'false')
        }

    })
    
    if(localStorage.getItem('dark-mode') && localStorage.getItem('active') === 'true'){
        $body.classList.add('dark')
        $btnSwitch.classList.add('active')
       
    } else {
        $body.classList.remove('dark')
        $btnSwitch.classList.remove('active')
    }

})