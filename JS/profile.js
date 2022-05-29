window.onload = async function () {

    if (localStorage.getItem("user_id") == "loggedout") {
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/index.html';
    } else {




        var user_id = localStorage.getItem('user_id');
        console.log("hello" + user_id)


        var profile_username = document.getElementById('profile_username')
        var profile_bio = document.getElementById('profile_bio')
        var profile_email = document.getElementById('profile_email')
        var user_reviews_container = document.getElementById('user_reviews_container')

        var user_info;
        var user_reviews;
        var review_restname;

        var edit_profile_btn = document.getElementById('edit_profile_btn')
        var profile_container = document.getElementById('profile_container')
        var user_profile_info = document.getElementById('user_profile_info')
        var edit_form_container = document.getElementById('edit_form_container')
        var close_edit_form = document.getElementById("close_edit_form")
        var submit_edit = document.getElementById("submit_edit")
        var bio_area = document.getElementById("bio_area")

        var profile_picture_container = document.getElementById("profile_picture_container")



        edit_profile_btn.addEventListener('click', function () {
            edit_form_container.style.display = "flex"
            edit_profile_btn.style.display = "none"
            profile_container.style.display = "none"
            user_profile_info.style.display = "none"
            user_reviews_container.style.display = "none"
        })




        close_edit_form.addEventListener("click", function () {
            edit_form_container.style.display = "none"
            edit_profile_btn.style.display = "block"
            profile_container.style.display = "flex"
            user_profile_info.style.display = "block"
            user_reviews_container.style.display = "block"
        })
























        header_profile.addEventListener('click', function () {
            location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/profile.html';
        })
        header_home.addEventListener('click', function () {
            location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/home.html';
        })
        document.getElementById("header_logout").addEventListener('click', function () {
            console.log("logging out")
            localStorage.setItem("user_id", "loggedout");
            location.reload()
        })







        // get user profile data
        let data = new FormData();
        data.append('user_id', user_id);
        await axios({
            method: 'post',
            url: 'http://localhost/eatvisor-backend/get-user.php',
            data: data,
        }).then(function (response) {
            user_info = response.data;
            console.log("user info", user_info[0]);

            profile_username.innerHTML = "Username: "+user_info[0]['username']
            profile_email.innerHTML = "Email: "+user_info[0]['email']
            profile_bio.innerHTML = "Bio: "+user_info[0]['user_bio']

            var image = new Image();
            image.className = "profile_image_round"
            image.src = `data:image/png;base64,${user_info[0]['profile_picture']}`;
            profile_picture_container.appendChild(image)

        })







        //get user reviews
        await axios({
            method: 'post',
            url: 'http://localhost/eatvisor-backend/get-user-review.php',
            data: data,
        }).then(async function (response) {
            user_reviews = response.data;
            console.log("user reviews", user_reviews[0])


            for (var i = 0; i < user_reviews.length; i++) {

                // get the restaurant name for each review
                let data1 = new FormData();
                data1.append('restaurant_id', user_reviews[i]['restaurants_restaurant_id']);

                await axios({
                    method: 'post',
                    url: 'http://localhost/eatvisor-backend/get-restaurant.php',
                    data: data1,
                }).then(function (response) {


                    restaurant_review_info = response.data;
                    console.log(restaurant_review_info)

                })


                const card = document.createElement('div');
                card.className = "user-review"
                card.innerHTML = `<div class="restaurant-profile-review">
            <div class="restaurant-profile-review-icon">
            <img src="data:image/png;base64,${restaurant_review_info[i]['restaurant_image']}">
            </div>
            <div class="restaurant-profile-review-name">${restaurant_review_info[i]['restaurant_name']}</div>
            </div>
            <div class="user-rating-review">${user_reviews[i]['rating']}</div>
            <div class="user-text-review">${user_reviews[i]['review_text']}</div>`;


                user_reviews_container.appendChild(card);


            }



        })








        

       








        
        submit_edit.addEventListener("click", function(){

            // editing bio 
            if(bio_area.value != ""){
                let bio_data = new FormData();

                bio_data.append('user_id', user_id);
                bio_data.append('bio', bio_area.value);
                // console.log(data);
                axios({
                    method: 'post',
                    url: 'http://localhost/eatvisor-backend/edit-bio.php',
                    data: bio_data,
                }).then(function (response) {
                    console.log(response.data)
                })
            }



            // uplaoding image as base64
            if(document.getElementById('profile_pic_input').files.length != 0){

                console.log("converting");
                var base64String = "";
                const selectedFile = document.getElementById('profile_pic_input').files[0];
                var reader = new FileReader();
                
                  
                reader.onload = function () {
                    base64String = reader.result.replace("data:", "")
                        .replace(/^.+,/, "");
              
                    imageBase64Stringsep = base64String;
              
                    // alert(imageBase64Stringsep);
                    console.log("-----------",base64String);
                    


                    let img_data = new FormData();

                img_data.append('user_id', user_id);
                img_data.append('profile_pic', base64String);
                console.log(data);
                axios({
                    method: 'post',
                    url: 'http://localhost/eatvisor-backend/edit-profile-img.php',
                    data: img_data,
                }).then(function (response) {
                    console.log(response.data)
                })
    
                }
                reader.readAsDataURL(selectedFile); 
            }

            









            edit_form_container.style.display = "none"
            edit_profile_btn.style.display = "block"
            profile_container.style.display = "flex"
            user_profile_info.style.display = "block"
            user_reviews_container.style.display = "block"









        })


        







    }
}