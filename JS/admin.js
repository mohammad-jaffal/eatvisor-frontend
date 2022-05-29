window.onload = async function(){


    if(localStorage.getItem("user_id") == "loggedout"){
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/index.html';
    }else{


    var user_card_container = document.getElementById('user_card_container')
    console.log('admin '+localStorage.getItem('user_id'))



    document.getElementById('header_users').addEventListener("click", function(){
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin.html';
    })
    document.getElementById('header_add').addEventListener("click", function(){
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin-add.html';
    })
    document.getElementById('header_monitor').addEventListener("click", function(){
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin-reviews.html';
    })
    document.getElementById("header_logout").addEventListener('click', function(){
        console.log("logging out")
        localStorage.setItem("user_id", "loggedout");
        location.reload()
    })





    await axios({
        method: 'post',
        url: 'http://localhost/eatvisor-backend/get-users.php',
    }).then(function (response) {

        
        // review_restname = response.data[0]['restaurant_name'];
        console.log(response.data)


        for (var i = 0; i < response.data.length; i++) {

            const card = document.createElement('div');
            card.className = "user-card"
            card.innerHTML = `<div class="user-card-image"></div>
            <div class="user-card-info">
                <div>username: ${response.data[i]['username']}</div>
                <div>email: ${response.data[i]['email']}</div>
                <div>bio: ${response.data[i]['user_bio']}</div>
            </div>`;
    
    
            user_card_container.appendChild(card);
    
    
        }


    })


}}