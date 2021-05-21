var reporteID = document.querySelector('#reporteID').textContent
var secret_token = Cookies.get('secret_token')
let tagsArray = []
 function deleteReport(report_id) {

    fetch(globalVars.apiEndPoint + '/user/reporte/editar?secret_token='+secret_token+'&reporteID='+report_id, {
         method: 'POST'
    })
    .then((response) => response.json())
    .then((data) => window.location.href=data.redirect)
    .catch(err => console.log(err))
 }

console.log('p id =' + reporteID)

function fetchData() {
    var secret_token = Cookies.get('secret_token')

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
            console.log('data', typeof data,  data)
            console.log('data.tags: ', data.tags, typeof data.tags)
            console.log('tagsArray ', tagsArray, typeof tagsArray)
            tagsArray = data.tags

            const usertype = data.tipo

if(usertype == 3) {
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
                           <p class="tag report-type">${tagsArray[0]}</p>
                           <p class="tag platform">${tagsArray[1]}</p> 
                           <button class="tag add"  id="eliminar" onclick="deleteReport('${data._id}')">Eliminar</button> 
      

                       </div>
                       <input type="text" class="reporte-cuerpo"  id="descripcion" value="${data.descripcion}"></input>
                       <div class="fechas">
                           <p class="fecha-reporte-creado">Creado en: ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                           <p class="fecha-reporte-editado">Ultima edición: ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                       </div>
                   </div>
                   <input type="submit" id="submit" value="guardar cambios" onclick="editReport('${data._id}')"></input>
               </div>
               
               </div>

               <div class="comments-div">
   <div class="comment-form">

       <div class="user-data">
           <img src="${data.loggedAvatar}" class="profile-picture"></img>
           <div class="username"> ${data.loggedUserName}
           </div>
       </div>
       <div class="info-reporte">
           <textarea type="text" id="comment-body" placeholder="Escribe un comentario:" style="resize: none;" rows="5"> </textarea>
          
           <input type="submit" value="comentar" id="submit" onclick="postComment()">

       </div>
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
                           <p class="tag report-type">${tagsArray[0]}</p>
                           <p class="tag platform">${tagsArray[1]}</p> 
                           <button class="tag add" value="Abierto" id="abierto" onclick="editReporteStatus('abierto')">Abierto</button> 
                            <button class="tag add" value="En proceso" id="en_proceso" onclick="editReporteStatus('en_proceso')">En Proceso</button> 
                            <button class="tag add" value="En Mantenimiento" id="en_mantenimiento" onclick="editReporteStatus('en_mantenimiento')"> En mantenimiento</button>
                            <button class="tag add" value="resuelto" id="resuelto" onclick="editReporteStatus('resuelto')"> Resuelto</button>
                           <button class="tag add"  id="eliminar" onclick="deleteReport('${data._id}')">Eliminar</button> 
      

                       </div>
                       <input type="text" class="reporte-cuerpo"  id="descripcion" value="${data.descripcion}"></input>
                       <div class="fechas">
                           <p class="fecha-reporte-creado">Creado en: ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                           <p class="fecha-reporte-editado">Ultima edición: ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                       </div>
                   </div>
                   <input type="submit" id="submit" value="guardar cambios" onclick="editReport('${data._id}')"></input>
               </div>
               
               </div>

               <div class="comments-div">
   <div class="comment-form">

       <div class="user-data">
           <img src="${data.loggedAvatar}" class="profile-picture"></img>
           <div class="username"> ${data.loggedUserName}
           </div>
       </div>
       <div class="info-reporte">
           <textarea type="text" id="comment-body" placeholder="Escribe un comentario:" style="resize: none;" rows="5"> </textarea>
          
           <input type="submit" value="comentar" id="submit" onclick="postComment()">

       </div>
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

const newReport = {
    titulo: titulo,
    descripcion: descripcion
}



 fetch(globalVars.apiEndPoint + '/user/reporte/modificar?secret_token='+secret_token+'&reporteID='+reporte_id, {
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
    const abierto = document.querySelector('#abierto')
    const en_proceso = document.querySelector('#en_proceso')
    const en_mantenimiento = document.querySelector('#en_mantenimiento')
    const resuelto = document.querySelector('#resuelto')
    
    if(tagsArray.length > 2) {
        tagsArray.pop()
    } else {
    tagsArray.push(status)
 console.log('click', tagsArray)
 fetch(globalVars.apiEndPoint + '/user/reporte/editar?secret_token='+secret_token+'&reporteID='+reporteID, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(tagsArray)
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
    



    
      
}









fetchData()