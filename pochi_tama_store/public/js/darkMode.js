function qs(element) {
    return document.querySelector(element);
}

window.addEventListener("load", function () {
    let $btnSwitch = qs("#switch");
    let $body = qs("body");
    
    $btnSwitch.addEventListener("click", () => {
        $body.classList.toggle("dark");
        $btnSwitch.classList.toggle("active1");
        
        if (
            $body.classList.contains("dark") &&
            $btnSwitch.classList.contains("active1")
            ) {
                localStorage.setItem("dark-mode", "true");
                localStorage.setItem("active1", "true");
            } else {
                localStorage.setItem("dark-mode", "false");
                localStorage.setItem("active1", "false");
            }
        });
        
        if (
            localStorage.getItem("dark-mode") &&
            localStorage.getItem("active1") === "true"
            ) {
                $body.classList.add("dark");
                $btnSwitch.classList.add("active1");
            } else {
                $body.classList.remove("dark");
                $btnSwitch.classList.remove("active1");
            }
        });
        
        