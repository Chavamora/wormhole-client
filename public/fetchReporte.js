var reporteID = document.querySelector('#reporteID').textContent

console.log('p id =' + reporteID)

function fetchData() {
    var secret_token = Cookies.get('secret_token')
    var monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
   

    fetch(globalVars.apiEndPoint + '/user/reporte?secret_token='+secret_token+'&reporteID='+reporteID)

    
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            const html =        
                 `
                <h1 class="titulo-reportes">${data.titulo}</h1>
                <div class="report">
                    <div class="user-data">
                        <img src="https://www.eleconomista.com.mx/__export/1617040370886/sites/eleconomista/img/2021/03/29/amlo_conferencia_29_marzo_reuters.jpg_2118499843.jpg"
                            class="profile-picture"></img>
                        <div class="username"> ${data.name}
                        </div>
                    </div>
                    <div class="info-reporte">
                        <div class="reporte-tags">
                            <p class="tag report-type">${data.tags[0]}</p>
                            <p class="tag platform">${data.tags[1]}</p>
                        </div>
                        <p class="reporte-cuerpo">${data.descripcion}</p>
                        <div class="fechas">
                            <p class="fecha-reporte-creado">Creado en: ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                            <p class="fecha-reporte-editado">Ultima edición: ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                        </div>
                    </div>
                </div>
                `
            console.log(html)
            document.querySelector('.general-report')
            .insertAdjacentHTML('beforeend', html) 
        })
        .catch(error => {
            console.log(error)
        })
}

fetchData()