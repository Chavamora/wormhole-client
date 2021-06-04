let nuevoReporteBoton = document.querySelector('.newReportButton')

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
            var tipo = data.tipo
            console.log(tipo)
            console.log(data)
            const html = data.map(reporte => {       
                // if (reporte.tipo == 1 || reporte.tipo == 2) {
                // } else {
                    
                // }
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

                    <p class="tag ${reporte.status}" id="All">${reporte.status}</p>
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
            nuevoReporteBoton.remove()
            console.log(error)
        })
}

fetchData()