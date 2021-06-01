let userID = document.querySelector('#userid').textContent
var secret_token = Cookies.get('secret_token')

function fetchData() {
    fetch(globalVars.apiEndPoint + '/user/perfil?secret_token=' + secret_token + '&userID=' + userID)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })
        .then(data => {
            console.log(data.data)
            const html = data.map(user => {
                return `
                <div style="background-image: url('${user.profile_picture_url}');" id="profilePicture"> </div>
                    <div id="profileGradient">
                        <div id="profileNameAndFollows">
                            <p id="userName"> ${user.name} </p>
                            <p class="followInfo">${user.followers.length} Seguidores</p>
                            <p class="followInfo">${user.following.length} Seguidos</p>
                            <a class="follow-unfollow-button" id="followBtn" data-docid="${user._id}">
                                seguir
                            </a>                        
                        </div>
                        
                    </div>
                `
            }).join("")
            console.log(html)
            document.querySelector('#profileCover')
            .insertAdjacentHTML('beforeend', html)
            followUnfollow()

        })
        
        .catch(error => {
            console.log(error)
        })
    } 

function followUnfollow() {
    followButton = document.querySelector('#followBtn');


    fetch(`${globalVars.apiEndPoint}/user/checkFollow/${userID}?secret_token=${secret_token}`).then(res => {
        if (res.status === 200) {
            followButton.classList.add('follow-button__active')
        } 
    }).catch(err => {
        console.log("SAD SAD SAD MAMA", err)
    }) 
    

    
    followButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            console.log("HEYHEYHEY")
            const userID =ev.target.dataset.docid

            if (followButton.classList.contains('follow-button__active')) {
                fetch(`${globalVars.apiEndPoint}/user/unfollow/${userID}?secret_token=${secret_token}`, {
                    method: 'DELETE'
                }).then(res => {
                    if (res.status === 200) {
                        followButton.classList.remove('follow-button__active')
                        followButton.textContent ='seguir'

                    }
                }).catch(err => {
                    console.log("SAD SAD SAD MAMA", err)
                }) 

            } else {
                fetch(`${globalVars.apiEndPoint}/user/follow/${userID}?secret_token=${secret_token}`, {
                    method: 'POST'
                }).then(res => {
                    console.log("HEYO", res)
    
                    if (res.status === 200) {
                       
                        followButton.classList.add('follow-button__active')    
                        followButton.textContent ='dejar de seguir'

                    }
                }).catch(err => {
                    console.log("SAD SAD SAD MAMA", err)
                }) 
            }
        })
    


}

fetchData()


