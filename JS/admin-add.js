window.onload = async function () {

    if (localStorage.getItem("user_id") == "loggedout") {
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/index.html';
    } else {





        document.getElementById('header_users').addEventListener("click", function () {
            location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin.html';
        })
        document.getElementById('header_add').addEventListener("click", function () {
            location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin-add.html';
        })
        document.getElementById('header_monitor').addEventListener("click", function () {
            location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin-reviews.html';
        })

        document.getElementById("header_logout").addEventListener('click', function () {
            console.log("logging out")
            localStorage.setItem("user_id", "loggedout");
            location.reload()
        })





        var rest_name = document.getElementById("rest_name")
        var rest_location = document.getElementById("rest_location")
        var rest_img_upload = document.getElementById("rest_img_upload")
        var rest_add = document.getElementById("rest_add")












        rest_add.addEventListener('click', function () {
            if (rest_name.value == "" || rest_location.value == "" || document.getElementById('rest_img_upload').files.length == 0) {
                alert('fill every thing')
            } else {


                console.log("converting");
                var base64String = "";
                const selectedFile = document.getElementById('rest_img_upload').files[0];
                var reader = new FileReader();


                reader.onload = function () {
                    base64String = reader.result.replace("data:", "")
                        .replace(/^.+,/, "");

                    imageBase64Stringsep = base64String;

                    // alert(imageBase64Stringsep);
                    console.log("-----------", base64String);


                    let data = new FormData();

                    data.append('restaurant_name', rest_name.value);
                    data.append('location', rest_location.value);
                    data.append('restaurant_img', base64String);
                    // console.log(data);
                    axios({
                        method: 'post',
                        url: 'http://localhost/eatvisor-backend/add-restaurant.php',
                        data: data,
                    }).then(function (response) {
                        console.log(response.data['success']);
                    })

                }
                reader.readAsDataURL(selectedFile);





















            }
        })




    }
}