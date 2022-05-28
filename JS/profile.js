window.onload = async function () {

    var user_id = localStorage.getItem('user_id');
    console.log("hello" + user_id)


    var profile_username = document.getElementById('profile_username')
    var profile_bio = document.getElementById('profile_bio')
    var profile_email = document.getElementById('profile_email')
    var user_reviews_container = document.getElementById('user_reviews_container')

    var user_info;
    var user_reviews;
    var review_restname;

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

        profile_username.innerHTML = user_info[0]['username']
        profile_email.innerHTML = user_info[0]['email']
        profile_bio.innerHTML = user_info[0]['user_bio']

    })







    //get user reviews
    await axios({
        method: 'post',
        url: 'http://localhost/eatvisor-backend/get-user-review.php',
        data: data,
    }).then(async function (response) {
        user_reviews = response.data;
        console.log("user reviews" , user_reviews[0])
    

        for (var i = 0; i < user_reviews.length; i++) {

            // get the restaurant name for each review
            let data1 = new FormData();
            data1.append('restaurant_id', user_reviews[i]['restaurants_restaurant_id']);

            await axios({
                method: 'post',
                url: 'http://localhost/eatvisor-backend/get-restaurant.php',
                data: data1,
            }).then(function (response) {

                
                review_restname = response.data[0]['restaurant_name'];
                console.log(review_restname)
    
            })


            const card = document.createElement('div');
            card.className = "user-review"
            card.innerHTML = `<div class="restaurant-profile-review">
            <div class="restaurant-profile-review-icon"></div>
            <div class="restaurant-profile-review-name">${review_restname}</div>
        </div>
        <div class="user-rating-review">${user_reviews[i]['rating']}</div>
        <div class="user-text-review">${user_reviews[i]['review_text']}</div>`;


        user_reviews_container.appendChild(card);
            

        }



    })
































}