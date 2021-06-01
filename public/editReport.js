var reporteID = document.querySelector('#reporteID').textContent
var secret_token = Cookies.get('secret_token')
let tagsArray = []
function deleteReport(report_id) {

    fetch(globalVars.apiEndPoint + '/user/reporte/editar?secret_token=' + secret_token + '&reporteID=' + report_id, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch(err => console.log(err))
}

console.log('p id =' + reporteID)

function fetchData() {
    var secret_token = Cookies.get('secret_token')

    fetch(globalVars.apiEndPoint + '/user/reporte?secret_token=' + secret_token + '&reporteID=' + reporteID)


        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            console.log('data', typeof data, data)
            console.log('data.tags: ', data.tags, typeof data.tags)
            console.log('tagsArray ', tagsArray, typeof tagsArray)
            tagsArray = data.tags

            const usertype = data.tipo

            if (usertype == 3) {
                const html =
                    `
                <div class="general-report">
               <input type="text" id="titulo" class="titulo-reportes" value="${data.titulo}"></input>
               <div class="report">
                   <div class="user-data">
                       <img src="${data.url}"
                           class="profile-picture"></img>
                       <div class="username"> ${data.name}
                       </div>
                   </div>
                   <div class="info-reporte">
                       <div class="reporte-tags">
                       <p class="tag platform">${data.status}</p> 


                       </div>
                       <input type="text" class="reporte-cuerpo"  id="descripcion" value="${data.descripcion}"></input>
                       <p name="solucion" id="solucion" style="margin-top: 2em;">${data.solucion}</p>

                       <div class="fechas">
                           <p class="fecha-reporte-creado">Creado en: ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                           <p class="fecha-reporte-editado">Ultima edición: ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                       </div>
                   </div>
                   <input type="submit" id="submit" value="guardar cambios" onclick="editReport('${data._id}')"></input>
               </div>
               
               </div>




               `
                console.log(html)
                document.querySelector('.report-comments')
                    .insertAdjacentHTML('beforeend', html)
            } else {
                const html =
                    `
                <div class="general-report">
               <input type="text" id="titulo" class="titulo-reportes" value="${data.titulo}"></input>
               <div class="report">
                   <div class="user-data">
                       <img src="${data.url}"
                           class="profile-picture"></img>
                       <div class="username"> ${data.name}
                       </div>
                   </div>
                   <div class="info-reporte">
                       <div class="reporte-tags">
                       <p class="tag platform">${data.status}</p> 
                           <button class="tag add" value="Abierto" id="abierto" onclick="editReporteStatus('abierto')">Abierto</button> 
                            <button class="tag add" value="En proceso" id="en_proceso" onclick="editReporteStatus('en_proceso')">En Proceso</button> 
                            <button class="tag add" value="En Mantenimiento" id="en_mantenimiento" onclick="editReporteStatus('en_mantenimiento')"> En mantenimiento</button>
                            <button class="tag add" value="resuelto" id="resuelto" onclick="editReporteStatus('resuelto')">Resuelto</button>
                           <button class="tag add"  id="eliminar" onclick="deleteReport('${data._id}')">Eliminar</button> 
                       </div>
                       <input type="text" class="reporte-cuerpo"  id="descripcion" value="${data.descripcion}" style="margin-top: 2em;"></input>
                       <textarea name="solucion" id="solucion" cols="30" rows="5" placeholder="solucion" style="margin-top: 2em;">${data.solucion}</textarea>
                       <div class="fechas">
                           <p class="fecha-reporte-creado">Creado en: ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                           <p class="fecha-reporte-editado">Ultima edición: ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                           </div>
                   </div>
                   <input type="submit" id="submit" value="guardar cambios" onclick="editReport('${data._id}')"></input>
               </div>

               </div>
               `
                console.log(html)
                document.querySelector('.report-comments')
                    .insertAdjacentHTML('beforeend', html)
            }
        })

        .catch(error => {
            console.log(error)
        })
}

function editReport(reporte_id) {
    const titulo = document.querySelector('#titulo').value
    const descripcion = document.querySelector('#descripcion').value
    const solucion = document.querySelector('#solucion').value

    const newReport = {
        titulo: titulo,
        descripcion: descripcion,
        solucion: solucion,
    }



    fetch(globalVars.apiEndPoint + '/user/reporte/editar?secret_token=' + secret_token + '&reporteID=' + reporte_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReport)
    })

    .then((res) => {
        console.log('Response success!')
        console.log(typeof res)
        console.log(res)
        res.json()
            .then(body => console.log(body))
            .catch(error => console.log(error))
        console.log('token actual ' + Cookies.get('secret_token'))
        console.log('11')
        window.location.href = '/reportes'
    })
}

function editReporteStatus(status) {
    const newbody = { status }
    fetch(globalVars.apiEndPoint + '/user/reporte/editar?secret_token=' + secret_token + '&reporteID=' + reporteID, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newbody)
    })
    .then((res) => {
        console.log('Response success!')
        console.log(typeof res)
        console.log(res)
        res.json()
            .then(body => console.log(body))
            .catch(error => console.log(error))
        console.log('token actual ' + Cookies.get('secret_token'))
        console.log('11')
        location.reload()
    })
}

fetchData()