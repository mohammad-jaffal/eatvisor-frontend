window.onload = async function () {

    if (localStorage.getItem("user_id") == "loggedout") {
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/index.html';
    } else {





        // get restorant id from local storage
        var rest_id = localStorage.getItem("restaurant_id");
        rest_id = rest_id.split("_").pop()
        user_id = localStorage.getItem("user_id");
        // console.log("welcome in rest " + rest_id + " Mr " + user_id);


        var resto_rating = localStorage.getItem(`resto_${rest_id}`)
        // console.log("sadasd",resto_rating)


        var review_btn = document.getElementById("review_btn")
        var rest_name = document.getElementById("rest_name")
        var rest_location = document.getElementById("rest_location")
        var rest_rating = document.getElementById("rest_rating")


        var rest_reviews_container = document.getElementById("restaurant_reviews_container")
        var restaurant_image_container = document.getElementById("restaurant_image_container")

        // header menu options
        header_profile.addEventListener('click', function () {
            location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/profile.html';
        })
        header_home.addEventListener('click', function () {
            location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/home.html';
        })
        document.getElementById("header_logout").addEventListener('click', function () {
            // console.log("logging out")
            localStorage.setItem("user_id", "loggedout");
            location.reload()
        })


        // get data for the restaurant the user clicked on
        var rest_info;
        var rest_reviews;
        // get restaurants info
        let data = new FormData();
        data.append('restaurant_id', rest_id);
        await axios({
            method: 'post',
            url: 'http://localhost/eatvisor-backend/get-restaurant.php',
            data: data,
        }).then(function (response) {
            rest_info = response.data
            // console.log(rest_info[0]['restaurant_image']);

            rest_name.innerHTML = rest_info[0]['restaurant_name']
            rest_location.innerHTML = rest_info[0]['location']
            rest_rating.innerHTML = resto_rating


            var image = new Image();
            image.className = "restaurant-banner-image"
            image.src = `data:image/png;base64,${rest_info[0]['restaurant_image']}`;
            restaurant_image_container.appendChild(image)


        })



        //get restaurants reviews
        await axios({
            method: 'post',
            url: 'http://localhost/eatvisor-backend/get-rest-review.php',
            data: data,
        }).then(async function (response) {

            rest_reviews = response.data
            // console.log(rest_reviews[0]);




            ///////////////////////////////////


            for (var i = 0; i < rest_reviews.length; i++) {

                // get the username for each review
                let data1 = new FormData();
                data1.append('user_id', rest_reviews[i]['users_user_id']);

                await axios({
                    method: 'post',
                    url: 'http://localhost/eatvisor-backend/get-username-img.php',
                    data: data1,
                }).then(function (response) {

                    review_user_info = response.data;
                    // console.log(review_user_info)

                })


                // create the review form with data
                const card = document.createElement('div');
                card.className = "restaurant-review"
                card.innerHTML = `<div class="user-profile-review">
                             <div class="user-profile-review-icon">
                             <img src="data:image/png;base64,${review_user_info[0]['profile_picture']}">
                             </div>
                             <div class="user-profile-review-name">${review_user_info[0]['username']}</div>
                         </div>
                      <div class="user-rating-review">${rest_reviews[i]['rating']}</div>
                        <div class="user-text-review">${rest_reviews[i]['review_text']}</div>`;


                rest_reviews_container.appendChild(card);

            }

        })


        var review_form_container = document.getElementById("review_form_container")
        // user reviews a restaurant
        review_btn.addEventListener("click", function () {
            review_form_container.style.display = "flex"
            review_btn.style.pointerEvents = "none"
        })

        var close_review = document.getElementById("close_review")
        close_review.addEventListener("click", function () {
            review_form_container.style.display = "none"
            review_btn.style.pointerEvents = "all"
        })



        var star_1 = document.getElementById("star_1")
        var star_2 = document.getElementById("star_2")
        var star_3 = document.getElementById("star_3")
        var star_4 = document.getElementById("star_4")
        var star_5 = document.getElementById("star_5")
        var input_rating = 0;

        var input_text_review = document.getElementById("input_text_review")


        star_1.addEventListener('click', function () {
            input_rating = 1;
            unSelectStars()
            selectStar(star_1)
        })
        star_2.addEventListener('click', function () {
            input_rating = 2;
            unSelectStars()
            selectStar(star_2)
        })
        star_3.addEventListener('click', function () {
            input_rating = 3;
            unSelectStars()
            selectStar(star_3)
        })
        star_4.addEventListener('click', function () {
            input_rating = 4;
            unSelectStars()
            selectStar(star_4)
        })
        star_5.addEventListener('click', function () {
            input_rating = 5;
            unSelectStars()
            selectStar(star_5)
        })


        function selectStar(element) {
            element.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        }

        function unSelectStars() {
            star_1.style.backgroundColor = ""
            star_2.style.backgroundColor = ""
            star_3.style.backgroundColor = ""
            star_4.style.backgroundColor = ""
            star_5.style.backgroundColor = ""
        }

        // submit review
        var submit_review = document.getElementById("submit_review")
        submit_review.addEventListener("click", function () {
            if (input_rating == 0 || input_text_review.value == "") {
                alert("fill all")
            } else {
                let review_data = new FormData()
                review_data.append("user_id", user_id)
                review_data.append("restaurant_id", rest_id)
                review_data.append("rating", input_rating)
                review_data.append("review_text", input_text_review.value)
                axios({
                    method: 'post',
                    url: 'http://localhost/eatvisor-backend/add-review.php',
                    data: review_data,
                }).then(function (response) {

                    // console.log(response.data);

                })
                location.reload()
            }
            review_form_container.style.display = "none"
            review_btn.style.pointerEvents = "all"

        })



    }
}