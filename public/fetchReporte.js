var reporteID = document.querySelector('#reporteID').textContent
var secret_token = Cookies.get('secret_token')


let tagsArray = []


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
            console.log('data', typeof data,  data)
            console.log('data.tags: ', data.tags, typeof data.tags)
            console.log('tagsArray ', tagsArray, typeof tagsArray)
            tagsArray = data.tags

            const usertype = data.tipo

            //tipo 3 = agente de reportes
            //tipo 4 = gerente de reportes
            if(data.tipo == 3) {

            const html =        
                 `
                 <div class="general-report">
                <h1 class="titulo-reportes">${data.titulo}</h1>
                <p>${data.usuario}</p>
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
                            <p class="tag platform">${tagsArray[2]}</p>  
                            <button class="tag add"  id="editar" onclick="location.replace('/reporte/editar/${data._id}')">Editar</button> 
                        </div>
                        <p class="reporte-cuerpo">${data.descripcion}</p>
                        <div class="fechas">
                            <p class="fecha-reporte-creado">Creado en: ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                            <p class="fecha-reporte-editado">Ultima edición: ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                        </div>
                    </div>
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
            <textarea type="text" id="comment-body" placeholder="Escribe un comentario:" style="resize: none;" rows="5"></textarea>
           
            <input type="submit" value="comentar" id="submit" onclick="postComment()">

        </div>
    </div>
</div>

                `
            console.log(html)
            document.querySelector('.report-comments')
            .insertAdjacentHTML('beforeend', html) 
            } else if (usertype == 4) {
                const html =        
                `
                <div class="general-report">
               <h1 class="titulo-reportes">${data.titulo}</h1>
               <p>${data.usuario}</p>
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
                           <p class="tag platform">${tagsArray[2]}</p> 

                           <button class="tag add" value="Abierto" id="abierto" onclick="editReporteStatus('abierto')">Abierto</button> 
                            <button class="tag add" value="En proceso" id="en_proceso" onclick="editReporteStatus('en_proceso')">En Proceso</button> 
                            <button class="tag add" value="En Mantenimiento" id="en_mantenimiento" onclick="editReporteStatus('en_mantenimiento')"> En mantenimiento</button>
                            <button class="tag add" value="resuelto" id="resuelto" onclick="editReporteStatus('resuelto')"> Resuelto</button>
                           <button class="tag add"  id="eliminar" onclick="deleteReport('${data._id}')">Eliminar</button> 
                           <button class="tag add"  id="eliminar" onclick="location.replace('/reporte/editar/${data._id}')">Editar</button> 

                       </div>
                       <p class="reporte-cuerpo">${data.descripcion}</p>
                       <div class="fechas">
                           <p class="fecha-reporte-creado">Creado en: ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                           <p class="fecha-reporte-editado">Ultima edición: ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                       </div>
                   </div>
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
            <textarea type="text" id="comment-body" placeholder="Escribe un comentario:" style="resize: none;" rows="5"></textarea>
           
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
               <h1 class="titulo-reportes">${data.titulo}</h1>
               <p>${data.usuario}</p>
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
                           <p class="tag platform">${tagsArray[2]}</p>

                       </div>
                       <p class="reporte-cuerpo">${data.descripcion}</p>
                       <div class="fechas">
                           <p class="fecha-reporte-creado">Creado en: ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                           <p class="fecha-reporte-editado">Ultima edición: ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(data.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}</p>
                       </div>
                   </div>
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
                       <textarea type="text" id="comment-body" placeholder="Escribe un comentario:" style="resize: none;" rows="5"></textarea>
                      
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

{/* <div class="comments-div">
    <div class="comment-form">

        <div class="user-data">
            <img src="${data.loggedAvatar}" class="profile-picture"></img>
            <div class="username"> ${data.loggedUserName}
            </div>
        </div>
        <div class="info-reporte">
            <textarea type="text" id="comment-body" placeholder="Escribe un comentario:" style="resize: none;" rows="5"></textarea>
           
            <input type="submit" value="comentar" id="submit" onclick="postComment()">

        </div>
    </div>
</div> */}