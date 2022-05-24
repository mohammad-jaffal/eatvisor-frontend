window.onload = function () {


var create_link = document.getElementById("create-link");
var signup_form = document.getElementsByClassName("signup-form-container")[0]
var body_container = document.getElementsByClassName("login-body-container")[0]
var x_icon = document.getElementsByClassName("x-icon")[0]




create_link.addEventListener("click", function(){
    signup_form.style.display = "flex";
    body_container.style.display = "none";
});


x_icon.addEventListener("click", function(){
    signup_form.style.display = "none";
    body_container.style.display = "flex";
});

}




