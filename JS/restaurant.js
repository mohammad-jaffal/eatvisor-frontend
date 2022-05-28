window.onload = async function () {
    var rest_id = localStorage.getItem("restaurant_id");
    rest_id = rest_id.split("_").pop()
    console.log("welcome in rest page " + rest_id);


    var rest_name = document.getElementById("rest_name")
    var rest_location = document.getElementById("rest_location")
    var rest_rating = document.getElementById("rest_rating")


    var rest_reviews_container = document.getElementById("restaurant_reviews_container")



    header_profile.addEventListener('click', function(){
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/profile.html';
    })
    header_home.addEventListener('click', function(){
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/home.html';
    })
    header_logout.addEventListener('click', function(){
        alert('logout')
    })











    var review_username;
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
        console.log(response.data[0]['restaurant_name']);

        rest_name.innerHTML = rest_info[0]['restaurant_name']
        rest_location.innerHTML = rest_info[0]['location']
        rest_rating.innerHTML = rest_info[0]['rating']

    })



    //get restaurants reviews
    await axios({
        method: 'post',
        url: 'http://localhost/eatvisor-backend/get-rest-review.php',
        data: data,
    }).then(async function (response) {

        rest_reviews = response.data
        console.log(rest_reviews[0]);




        ///////////////////////////////////


        for (var i = 0; i < rest_reviews.length; i++) {

            // get the username for each review
            let data1 = new FormData();
            data1.append('user_id', rest_reviews[i]['users_user_id']);

            await axios({
                method: 'post',
                url: 'http://localhost/eatvisor-backend/get-username.php',
                data: data1,
            }).then(function (response) {
        
                review_username = response.data[0]['username'];
    
            })


            // create the review form with data
            const card = document.createElement('div');
            card.className = "restaurant-review"
            card.innerHTML = `<div class="user-profile-review">
                             <div class="user-profile-review-icon"></div>
                             <div class="user-profile-review-name">${review_username}</div>
                         </div>
                      <div class="user-rating-review">${rest_reviews[i]['rating']}</div>
                        <div class="user-text-review">${rest_reviews[i]['review_text']}</div>`;


            rest_reviews_container.appendChild(card);

        }

    })



}