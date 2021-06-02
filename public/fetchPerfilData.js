function fetchData() {
    var secret_token = Cookies.get('secret_token')
    fetch(globalVars.apiEndPoint + '/user/perfil?secret_token=' + secret_token)
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
                        </div>
                    </div>
                `
            }).join("")
            console.log(html)
            document.querySelector('#profileCover')
            .insertAdjacentHTML('beforeend', html) 
        })
        .catch(error => {
            console.log(error)
        })
}


function fetchFollowsData() {
    var secret_token = Cookies.get('secret_token')
    fetch(globalVars.apiEndPoint + '/user/getFollows?secret_token=' + secret_token)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            const html = data.map(user => {
                return `
                <a href="/users/${user.id}" data-doc="${user.id}" class="userLink">
                <div class="followed-user">
                            <div class="followed-user-picture" style="background-image: url('${user.url}')">

                            </div>
                            <div class="followed-user-name">
                                ${user.name}
                            </div>
                        </div>
                        </a>
                `
            }).join("")
            console.log(html)
            document.querySelector('.user-follows-list')
            .insertAdjacentHTML('beforeend', html)


            
        })
        .catch(error => {
            console.log(error)
        })
}


function fetchBiografiaData() {
    var secret_token = Cookies.get('secret_token')
    fetch(globalVars.apiEndPoint + '/user/editar?secret_token=' + secret_token)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            const html = data.map(user => {
                return `
                <div class="phrase">
                <h4> ${user.frase} </h4>
            </div>

            <div class="biography">
                <h3>biografía</h3>
                <p>${user.biografia}
                </p>
            </div>
                `
            }).join("")
            console.log(html)
            document.querySelector('.user-frontpage')
            .insertAdjacentHTML('afterbegin', html) 
            
        })
        .catch(error => {
            console.log(error)
        })
}

function updateBiografia(biografia) {
    var secret_token = Cookies.get('secret_token')
    fetch(globalVars.apiEndPoint + '/user/editar?secret_token=' + secret_token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({biografia})
    })
    .then(res => {
        console.log('Response success!')
        console.log(typeof res)
        console.log(res)
        
            res.json()
            .then(body => {
                if (body.error) {
                    console.log(body.error)
                    alert(body.error)
                } else {
                    
                console.log('token actual ' + Cookies.get('secret_token'))
                console.log('11')
                window.location.href="/users/perfil"  
                }
            })
            
            .catch(error => console.log(error))   
        
    })

    .catch(error => {
        console.error(":C")
        console.error(error)
    })
}

const editar_biografia = document.querySelector('#editarBiografia')
editar_biografia.addEventListener('click',e => {
    const content = document.querySelector('#postContentInput').value

    updateBiografia(content)
})

fetchData()
fetchFollowsData()
fetchBiografiaData()