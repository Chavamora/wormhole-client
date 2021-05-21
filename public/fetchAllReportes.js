

function fetchData() {
    var secret_token = Cookies.get('secret_token')
    var monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    fetch(globalVars.apiEndPoint + '/user/reportes?secret_token=' + secret_token)

    
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })


        
        .then(data => {
            console.log(data.data)
            const html = data.map(reporte => {       
                return `
                <div class="report">
                    <div class="user-data">
                <img src="${reporte.url}"
                    class="profile-picture"></img>
                <div class="username"> ${reporte.name}
                </div>
            </div>
            <div class="info-reporte">
                <div class="titulo-tags">

                    <p class="tag report-type">${reporte.tags[0]}</p>
                    <p class="tag platform">${reporte.tags[1]}</p>
                    <a href="/reporte/${reporte._id}"><p class="titulo-reportes">${reporte.titulo}</p></a>
                </div>

                <div class="fechas">

                
                    <p class="fecha-reporte-creado">${moment(reporte.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(reporte.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p> 
                    <p class="fecha-reporte-editado">Ultima edición: ${moment(reporte.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(reporte.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                </div>
            </div>
        </div>    
                `
            }).join("")
            console.log(html)
            document.querySelector('.general-report')
            .insertAdjacentHTML('beforeend', html) 
        })
        .catch(error => {
            console.log(error)
        })
}

fetchData()