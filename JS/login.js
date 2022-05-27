window.onload = function () {


    var create_link = document.getElementById("create-link")
    var signup_form = document.getElementsByClassName("signup-form-container")[0]
    var body_container = document.getElementsByClassName("login-body-container")[0]
    var x_icon = document.getElementsByClassName("x-icon")[0]

    var su_username = document.getElementById("su_username")
    var su_email = document.getElementById("su_email")
    var su_password = document.getElementById("su_password")
    var su_confirm_password = document.getElementById("su_confirm_password")
    var su_btn = document.getElementById("su_btn")

    var li_email = document.getElementById("li_email")
    var li_password = document.getElementById("li_password")
    var li_btn = document.getElementById("li_btn")





    create_link.addEventListener("click", function () {
        signup_form.style.display = "flex";
        body_container.style.display = "none";
    });


    x_icon.addEventListener("click", function () {
        signup_form.style.display = "none";
        body_container.style.display = "flex";
    });


    su_btn.addEventListener("click", function () {
        if (su_username.value == "" || su_email.value == "" || su_password.value == "" || su_confirm_password.value == "") {
            alert("fill all boxes");
        } else {


            if (su_password.value != su_confirm_password.value) {
                alert("wrong password");
            } else {

                let data = new FormData();

                data.append('username', su_username.value);
                data.append('email', su_email.value);
                data.append('user_password', su_password.value);
                // console.log(data);
                axios({
                    method: 'post',
                    url: 'http://localhost/eatvisor-backend/sign-up.php',
                    data: data,
                }).then(function (response) {
                    console.log(response.data["success"]);
                })

            }



        }
    });



    li_btn.addEventListener("click", function () {
        if (li_email.value == "" || li_password.value == "") {
            alert("fill all boxes");
        } else {

            let data = new FormData();

            data.append('email', li_email.value);
            data.append('user_password', li_password.value);
            // console.log(data);
            axios({
                method: 'post',
                url: 'http://localhost/eatvisor-backend/log-in.php',
                data: data,
            }).then(function (response) {
                console.log(response.data["success"]);
                console.log(response.data["user_id"]);
                if(response.data["success"]){
                    location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/home.html';
                }
            })

        }

    });










}




