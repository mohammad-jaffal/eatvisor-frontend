window.onload = async function () {


    if (localStorage.getItem("user_id") == "loggedout") {
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/index.html';
    } else {


        var user_card_container = document.getElementById('user_card_container')
        // console.log('admin '+localStorage.getItem('user_id'))



        var header_users = document.getElementById('header_users')
        var header_add = document.getElementById('header_add')
        var header_monitor = document.getElementById('header_monitor')
        var header_logout = document.getElementById('header_logout')
        header_users.addEventListener("click", function () {
            location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin.html';
        })
        header_add.addEventListener("click", function () {
            location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin-add.html';
        })
        header_monitor.addEventListener("click", function () {
            location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/admin-reviews.html';
        })
        header_logout.addEventListener('click', function () {
            // console.log("logging out")
            localStorage.setItem("user_id", "loggedout");
            location.reload()
        })

        header_users.style.textDecoration = "underline"





        // get all users
        await axios({
            method: 'post',
            url: 'http://localhost/eatvisor-backend/get-users.php',
        }).then(function (response) {


            // review_restname = response.data[0]['restaurant_name'];
            // console.log(response.data)

            // create cards for each user
            for (var i = 0; i < response.data.length; i++) {

                const card = document.createElement('div');
                card.className = "user-card"
                card.innerHTML = `<div class="user-card-image">
            <img src="data:image/png;base64,${response.data[i]['profile_picture']}">
            </div>
            <div class="user-card-info">
                <div>username: ${response.data[i]['username']}</div>
                <div>email: ${response.data[i]['email']}</div>
                <div>bio: ${response.data[i]['user_bio']}</div>
            </div>`;


                user_card_container.appendChild(card);


            }


        })


    }
}