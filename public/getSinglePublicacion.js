var postID = document.querySelector('#reporteID').textContent
var secret_token = Cookies.get('secret_token')

console.log('p id =' + postID)

function fetchData() {
    var secret_token = Cookies.get('secret_token')
    var monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
   

    fetch(globalVars.apiEndPoint + '/user/publicacion?secret_token='+secret_token+'&postID='+postID)

    
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })
        .then(data => {
            const date = moment.tz(data.createdAt, "America/Mexico_City");

            console.log(data)

            if(data.url) {

                const html =        
                `
            <div class="post">
            <div class="post-info">
                <div class="user-picture" style="background-image:url('${data.url_user}');"></div>
                <div>
                <div class="user-name">${data.usuario}</div>
                <p class="post-date">
                ${moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}
                </p>
            </div>
            </div>
            <div class="post-content">
                ${data.cuerpo}
            </div>
            <img src="${data.url}" class="post-image">
            <div class="post-buttons">
                <a href="#">like</a>
                <a href="#">dislike</a>
            </div>
        </div>

            `
            console.log(html)
            document.querySelector('.post-and-comments')
            .insertAdjacentHTML('afterbegin', html) 

            } else {
                const html =        
                `
                <div class="post">
                <div class="post-info">
                    <div class="user-picture" style="background-image: url('${data.url_user}'); "></div>
                    <div>
                    <div class="user-name">${data.usuario}</div>
                    <p class="post-date">
                    ${moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}
                    </p>
                </div>
                </div>
                <div class="post-content">
                    ${data.cuerpo}
                </div>
                <div class="post-buttons">
                    <a href="#">like</a>
                    <a href="#">dislike</a>
                </div>
            </div>

                `
                console.log(html)
            document.querySelector('.post-and-comments')
            .insertAdjacentHTML('beforeend', html) 
            }
            
           
        })
    
        .catch(error => {
            console.log(error)
        })
} fetchData()