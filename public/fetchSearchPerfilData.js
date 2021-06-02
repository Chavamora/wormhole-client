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

    


    function fetchNavBarData() {
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
                const profileNav = data.map(user => {
                    return `
                    <div id="profileNav">
                    <div id="profileNavList">
                    <a class="btn adatadoc" data-doc="${user._id}"> Publicaciones </a>
                    <a class="btn adatadoc" data-doc="/user/hobbies/${user._id}">Hobbies</a>
                    <a class="btn adatadoc" data-doc="/user/materias/${user._id}">Estudio</a>
                    <a class="btn adatadoc" data-doc="/user/deportes/${user._id}">Deportes</a>
                    <a class="btn adatadoc" data-doc="/user/metas/${user._id}">Metas</a>
                    <!-- <a class="btn" href="/users/rueda_de_vida">Rueda De Vida</a> -->
                    </div>
                </div>
                `
            }).join("")
            console.log(profileNav)
            document.querySelector('#infoPerfil')
            .insertAdjacentHTML('beforeend', profileNav)
                
            fetchUserModulesData()

    
            })
            
            .catch(error => {
                console.log(error)
            })
        }

    
    function fetchUserModulesData(){
        const links= document.querySelectorAll('.adatadoc')
        links.forEach(element => {
            element.addEventListener('click', e => {
                console.log('buenas')
                endpoint = e.target.dataset.doc
                fetch(globalVars.apiEndPoint + endpoint + '?secret_token=' + secret_token)
                .then(response => {
                    console.log(response)
                    if (!response.ok) {
                        throw Error('ERROR')
                    }
                    return response.json()
                })
                .then(data => {
                    console.log(data.data)


           
                    const itemHtml = data.map(item => {
                        if('horas_semana' in item) {

                        return `
                        <a class="single" href="#">
                <div class="flex-table">
                    <div class="flex-item">
                        <p>${item.nombre}</p>
                    </div>
                    <div class="flex-item">
                        <p>${item.horas_semana}</p>
                    </div>
                    <div class="flex-item">
                        <p>${item.notas}</p>
                    </div>
                </div>
                </a>
                    `
                        }  else if('prioridad' in item){
                            return `
                            <a class="single" href="#">
                    <div class="flex-table">
                        <div class="flex-item">
                            <p>${item.responsable}</p>
                        </div>
                        <div class="flex-item">
                            <p>${item.prioridad}</p>
                        </div>
                        <div class="flex-item">
                            <p>${item.estado}</p>
                        </div>
                        <div class="flex-item">
                            <p>${item.fecha_inicio}</p>
                        </div>
                        <div class="flex-item">
                            <p>${item.fecha_final}</p>
                        </div>
                        <div class="flex-item">
                            <p>${item.notas}</p>
                        </div>
                    </div>
                    </a>
                        `
                    } else if('desempeño' in item) {
                        return `
                        <a class="single" href="#">
                <div class="flex-table">
                    <div class="flex-item">
                        <p>${item.nombre}</p>
                    </div>
                    <div class="flex-item">
                        <p>${item.ejercicio}</p>
                    </div>
                    <div class="flex-item">
                        <p>${item.series}</p>
                    </div>
                    <div class="flex-item">
                        <p>${item.desempeño}</p>
                    </div>
                    <div class="flex-item">
                        <p>${item.notas}</p>
                    </div>
                </div>
                </a>
                    `
                } else {
                    return `
                    <a class="single" href="#">
            <div class="flex-table">
                <div class="flex-item">
                    <p>${item.nombre}</p>
                </div>
                <div class="flex-item">
                    <p>${item.descripcion}</p>
                </div>
                <div class="flex-item">
                    <p>${item.notas}</p>
                </div>
            </div>
            </a>
                `  
                }       
                        
                }).join("")
                console.log(itemHtml)
                document.querySelector('.user-frontpage')
                .innerHTML = (itemHtml)
            })
        })
    })
}
    

    function fetchBiografiaData() {
        var secret_token = Cookies.get('secret_token')
        fetch(globalVars.apiEndPoint + '/user/perfil?secret_token=' + secret_token + '&userID=' + userID)
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

    function fetchFollowsData() {
        var secret_token = Cookies.get('secret_token')
        fetch(globalVars.apiEndPoint + '/user/getFollows/'+ userID +'?secret_token=' + secret_token)
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



function followUnfollow() {
    followButton = document.querySelector('#followBtn');


    fetch(`${globalVars.apiEndPoint}/user/checkFollow/${userID}?secret_token=${secret_token}`).then(res => {
        if (res.status === 200) {
            followButton.classList.add('follow-button__active')
            followButton.textContent ='dejar de seguir'

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

fetchBiografiaData() 
fetchFollowsData()
fetchNavBarData()
