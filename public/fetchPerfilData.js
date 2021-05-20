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
                <img src="${user.profile_picture_url}" id="profilePicture"> </div>
                    <div id="profileGradient">
                        <div id="profileNameAndFollows">
                            <p id="userName"> ${user.name} </p>
                            <p class="followInfo">10 Seguidores</p>
                            <p class="followInfo">11 Seguidos</p>
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

fetchData()
