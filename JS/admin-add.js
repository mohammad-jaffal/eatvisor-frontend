window.onload = async function () {

    if (localStorage.getItem("user_id") == "loggedout") {
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/index.html';
    } else {




        var header_users = document.getElementById('header_users')
        var header_add = document.getElementById('header_add')
        var header_monitor = document.getElementById('header_monitor')
        var header_logout = document.getElementById('header_logout')
        header_users.addEventListener("click", function () {
            location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin.html';
        })
        header_add.addEventListener("click", function () {
            location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin-add.html';
        })
        header_monitor.addEventListener("click", function () {
            location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin-reviews.html';
        })
        header_logout.addEventListener('click', function () {
            // console.log("logging out")
            localStorage.setItem("user_id", "loggedout");
            location.reload()
        })
        header_add.style.textDecoration = "underline"




        var rest_name = document.getElementById("rest_name")
        var rest_location = document.getElementById("rest_location")
        var rest_img_upload = document.getElementById("rest_img_upload")
        var rest_add = document.getElementById("rest_add")

        // on add button click
        rest_add.addEventListener('click', function () {
            if (rest_name.value == "" || rest_location.value == "" || rest_img_upload.files.length == 0) {
                alert('fill every thing')
            } else {

                // convert image to base64
                var base64String = "";
                const selectedFile = rest_img_upload.files[0];
                var reader = new FileReader();


                reader.onload = function () {
                    base64String = reader.result.replace("data:", "")
                        .replace(/^.+,/, "");
                    imageBase64Stringsep = base64String;


                    // send resto data to api
                    let data = new FormData();
                    data.append('restaurant_name', rest_name.value);
                    data.append('location', rest_location.value);
                    data.append('restaurant_img', base64String);
                    axios({
                        method: 'post',
                        url: 'http://localhost/eatvisor-backend/add-restaurant.php',
                        data: data,
                    }).then(function (response) {
                        // console.log(response.data['success']);
                    })
                }
                reader.readAsDataURL(selectedFile);


            }
            location.reload()
        })
    }
}