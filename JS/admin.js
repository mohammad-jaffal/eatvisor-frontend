window.onload = async function(){

    var user_card_container = document.getElementById('user_card_container')


    console.log('admin '+localStorage.getItem('user_id'))

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









        // <div class="user-card">
        //         <div class="user-card-image"></div>
        //         <div class="user-card-info">
        //             <div>username</div>
        //             <div>email</div>
        //             <div>bio</div>
        //         </div>
        //     </div>

    })


}