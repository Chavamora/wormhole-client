
function fetchData() {
    var secret_token = Cookies.get('secret_token')
    var monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    fetch(globalVars.apiEndPoint + '/user/publicaciones?secret_token=' + secret_token)

    
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })


        
        .then(data => {        
            const html = data.map(publicacion => {    
                
                const date = moment.tz(publicacion.createdAt, "America/Mexico_City");

                if(publicacion.url) {

                    return `
                <div class="post">
                <div class="post-info">
                    <div class="user-picture" style="background-image:url('${publicacion.url_user}');"></div>
                    <div>
                    <div class="user-name">${publicacion.usuario}</div>
                    <p class="post-date">
                    ${moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}
                    </p>
                </div>
                </div>
                <a href="/publicaciones/${publicacion._id}">
                <div class="post-content">
                    ${publicacion.cuerpo}
                </div>
                </a>
                <img src="${publicacion.url}" class="post-image">
                <div class="post-buttons">
                    <a href="#">${publicacion.likes} like</a>
                    <a href="#">${publicacion.dislikes} dislike</a>
                    <a href="/publicaciones/${publicacion._id}">comentarios</a>
                </div>
            </div>

                `
           

                } else {
                    return `
                    <div class="post">
                    <div class="post-info">
                        <div class="user-picture" style="background-image: url('${publicacion.url_user}'); "></div>
                        <div>
                        <div class="user-name">${publicacion.usuario}</div>
                        <p class="post-date">
                        ${moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}
                        </p>
                    </div>
                    </div>
                    <div class="post-content">
                        ${publicacion.cuerpo}
                    </div>
                    <div class="post-buttons">
                    <a href="#">${publicacion.likes} like</a>
                    <a href="#">${publicacion.dislikes} dislike</a>
                        <a href="#">comentarios</a>
                    </div>
                </div>
    
                    `
                }
                
            }).join("")
            console.log(html)
            document.querySelector('.all-posts-container')
            .insertAdjacentHTML('beforeend', html)      
        
        
        })
        .catch(error => {
            console.log(error)
        })
}

fetchData()