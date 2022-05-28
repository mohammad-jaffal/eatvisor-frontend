window.onload = async function (){

    admin_reviews_container = document.getElementById('admin_reviews_container')

    document.getElementById('header_users').addEventListener("click", function(){
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin.html';
    })
    document.getElementById('header_add').addEventListener("click", function(){
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin-add.html';
    })
    document.getElementById('header_monitor').addEventListener("click", function(){
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin-reviews.html';
    })




    await axios({
        method: 'post',
        url: 'http://localhost/eatvisor-backend/get-reviews.php',
    }).then(function (response) {

        
        // review_restname = response.data[0]['restaurant_name'];
        console.log(response.data)


        for (var i = 0; i < response.data.length; i++) {

            const card = document.createElement('div');
            card.className = "admin-reviews"
            card.innerHTML = `<div class="admin-reviews-info">
            <div>user: ${response.data[i]['users_user_id']}</div>
            <div>restaurant: ${response.data[i]['restaurants_restaurant_id']}</div>
            <div>review: ${response.data[i]['review_text']}</div>
        </div>
        <div>
            <button>accept</button>
            <button>decline</button>
        </div>`;
    
    
            admin_reviews_container.appendChild(card);
    
    
        }


    })

}


