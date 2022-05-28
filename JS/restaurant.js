window.onload = async function () {
    var rest_id = localStorage.getItem("restaurant_id");
    rest_id = rest_id.split("_").pop()
    console.log("welcome in rest page " + rest_id);


    var rest_name = document.getElementById("rest_name")
    var rest_location = document.getElementById("rest_location")
    var rest_rating = document.getElementById("rest_rating")


    var rest_reviews_container = document.getElementById("restaurant_reviews_container")

    var review_username;
    var rest_info;
    // get restaurants info
    let data = new FormData();
    data.append('restaurant_id', rest_id);
    await axios({
        method: 'post',
        url: 'http://localhost/eatvisor-backend/get-restaurant.php',
        data: data,
    }).then(function (response) {

        console.log(response.data[0]['restaurant_name']);

        rest_name.innerHTML = response.data[0]['restaurant_name']
        rest_location.innerHTML = response.data[0]['location']
        rest_rating.innerHTML = response.data[0]['rating']

    })



    //get restaurants reviews
    await axios({
        method: 'post',
        url: 'http://localhost/eatvisor-backend/get-rest-review.php',
        data: data,
    }).then(async function (response) {

        rest_info = response.data
        console.log(rest_info[0]);




        ///////////////////////////////////


        for (var i = 0; i < rest_info.length; i++) {

            // get the username for each review
            let data1 = new FormData();
            data1.append('user_id', rest_info[i]['users_user_id']);

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
                      <div class="user-rating-review">${rest_info[i]['rating']}</div>
                        <div class="user-text-review">${rest_info[i]['review_text']}</div>`;


            rest_reviews_container.appendChild(card);

        }

    })



}