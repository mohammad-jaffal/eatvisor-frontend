window.onload = async function () {

    console.log("hello from the other side" + localStorage.getItem("user_id"));

    var rest_list_container = document.getElementById("rest_list_container")



    var x;



    await axios({
        method: 'post',
        url: 'http://localhost/eatvisor-backend/get-restaurants.php',
    }).then(function (response)  {
        
        x = response.data;
        console.log(x);

        for(var i = 0 ; i < x.length ; i++){
            rest_list_container.innerHTML += `<div id="rest_${x[i]['restaurant_id']}" class="restaurant-list-item">
            <img src="./assets/images/rest-1.jpg" class="restaurant-image">
            <div class="item-info-container">
                <p>${x[i]['restaurant_name']}</p>
                <p>${x[i]['rating']}</p>
                <p>${x[i]['location']}</p>
            </div>
        </div>`;

        
            
        }

    })

    // for(var j = 0 ; j < x.length ; j++){
    //     document.getElementById("rest_1").addEventListener("click", function(){
    //         console.log(j)
    //     })
    // }
















    








}