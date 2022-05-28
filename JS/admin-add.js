window.onload = async function() {

    document.getElementById('header_users').addEventListener("click", function(){
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin.html';
    })
    document.getElementById('header_add').addEventListener("click", function(){
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin-add.html';
    })
    document.getElementById('header_monitor').addEventListener("click", function(){
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin-reviews.html';
    })



    var rest_name = document.getElementById("rest_name")
    var rest_location = document.getElementById("rest_location")
    var rest_img_upload = document.getElementById("rest_img_upload")
    var rest_add = document.getElementById("rest_add")


    rest_add.addEventListener('click', function(){
        if(rest_name.value == "" || rest_location.value == ""){
            alert('fill every thing')
        }else{

            let data = new FormData();

            data.append('restaurant_name', rest_name.value);
            data.append('location', rest_location.value);
            // console.log(data);
            axios({
                method: 'post',
                url: 'http://localhost/eatvisor-backend/add-restaurant.php',
                data: data,
            }).then(function (response) {
                console.log(response.data['success']);
            })

        }
    })




}