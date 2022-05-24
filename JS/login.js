window.onload = function () {


var create_link = document.getElementById("create-link");
var signup_form = document.getElementsByClassName("signup-form-container")[0]
var body_container = document.getElementsByClassName("body-container")[0]

create_link.addEventListener("click", function(){
    signup_form.style.display = "flex";
    body_container.style.pointerEvents = "none";
});







}




