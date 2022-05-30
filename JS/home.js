window.onload = async function () {
    // redirect to log in page if user log out
    if(localStorage.getItem("user_id") == "loggedout"){
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/index.html';
    }else{






    // console.log("hello from the other side" + localStorage.getItem("user_id"));

    var rest_list_container = document.getElementById("rest_list_container")
    var header_profile = document.getElementById("header_profile")
    var x;


    // add fuinctions for header options 
    header_profile.addEventListener('click', function(){
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/profile.html';
    })
    header_home.addEventListener('click', function(){
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/home.html';
    })
    document.getElementById("header_logout").addEventListener('click', function(){
        // console.log("logging out")
        localStorage.setItem("user_id", "loggedout");
        location.reload()
    })
    header_home.style.textDecoration = "underline"



    // get restaurants
    await axios({
        method: 'post',
        url: 'http://localhost/eatvisor-backend/get-restaurants.php',
    }).then(function (response) {

        x = response.data;
        // console.log(x);

    })
    // create card for each restaurant
    for (var i = 0; i < x.length; i++) {

        const card = document.createElement('div');
        card.id = `rest_${x[i]['restaurant_id']}`;
        card.className = "restaurant-list-item"
        card.innerHTML = `<img src="data:image/png;base64,${x[i]['restaurant_image']}" class="restaurant-banner-image ">
                <div class="item-info-container">
                    <p>${x[i]['restaurant_name']}</p>
                    <p>${x[i]['rating']}</p>
                    <p>${x[i]['location']}</p>
                </div>`;


        rest_list_container.appendChild(card);


    }


    // creat oncklick for resto card
    var items = document.getElementsByClassName("restaurant-list-item");
    for (const element of items) { // You can use `let` instead of `const` if you like
        element.addEventListener("click", function () {
            // console.log(element.id)
            localStorage.setItem("restaurant_id", element.id);
            location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/restaurant.html';
        })
    }


    // for (var j = 0; j < x.length; j++) {
    //     console.log("rest_" + x[j]["restaurant_id"])
    //     document.getElementById(String("rest_" + x[j]["restaurant_id"])).addEventListener("click", function () {
    //         console.log(j)
    //     })
    // }

    // var rest_item = document.getElementById('rest_1')
    // rest_item.addEventListener("click", function(){
    //     console.log(x[1]["restaurant_id"])
    // })





}
}