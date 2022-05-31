window.onload = async function () {


    if (localStorage.getItem("user_id") == "loggedout") {
        location.href = 'file:///C:/Users/Admin/Desktop/FSW%20Projects/eatvisor-website/index.html';
    } else {




        admin_reviews_container = document.getElementById('admin_reviews_container')


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
        header_monitor.style.textDecoration = "underline"




        // get unapproved reviews
        var all_reviews;
        await axios({
            method: 'post',
            url: 'http://localhost/eatvisor-backend/get-reviews-inner.php',
        }).then(function (response) {


            // review_restname = response.data[0]['restaurant_name'];

            all_reviews = response.data
            // console.log('hi', all_reviews)
            // console.log(all_reviews)

            if (all_reviews.length == 0) {
                const empty_card = document.createElement('div');
                empty_card.className = "admin-reviews"
                empty_card.innerHTML = `<div>No Reviews Pending</div>`
                admin_reviews_container.appendChild(empty_card);

            } else {

                // create card for each review
                for (var i = 0; i < all_reviews.length; i++) {

                    const card = document.createElement('div');
                    card.className = "admin-reviews"
                    card.innerHTML = `<div class="admin-reviews-info">
            <div>user: ${all_reviews[i]['username']}</div>
            <div>restaurant: ${all_reviews[i]['restaurant_name']}</div>
            <div>review: ${all_reviews[i]['review_text']}</div>
        </div>
        <div>
            <button class="accept-btn" id="accept_${all_reviews[i]['review_id']}">accept</button>
            <button class="decline-btn" id="decline_${all_reviews[i]['review_id']}">decline</button>
        </div>`;


                    admin_reviews_container.appendChild(card);
                }
            }
        })


        // linking each accept button to its card 
        var acc_btns = document.getElementsByClassName("accept-btn");
        for (const element of acc_btns) {

            element.addEventListener("click", function () {
                // console.log('accept')
                var acc_id = element.id.split("_").pop()
                // console.log(acc_id)


                let rid = new FormData();
                rid.append('review_id', acc_id);
                axios({
                    method: 'post',
                    url: 'http://localhost/eatvisor-backend/accept-review.php',
                    data: rid,
                }).then(function (response) {
                    // console.log(response.data)
                    location.reload()
                })


            })
        }


        // linking each decline button to its card 
        var dec_btns = document.getElementsByClassName("decline-btn");
        for (const element of dec_btns) { // You can use `let` instead of `const` if you like
            element.addEventListener("click", function () {
                // console.log('accept')
                var dec_id = element.id.split("_").pop()
                // console.log(dec_id)


                let rid = new FormData();
                rid.append('review_id', dec_id);
                axios({
                    method: 'post',
                    url: 'http://localhost/eatvisor-backend/decline-review.php',
                    data: rid,
                }).then(function (response) {
                    // console.log(response.data)
                    location.reload()
                })


            })
        }



    }


}