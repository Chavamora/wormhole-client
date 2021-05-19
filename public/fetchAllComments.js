
var reporteID = document.querySelector('#reporteID').textContent

function fetchData() {
    var secret_token = Cookies.get('secret_token')
    var monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    fetch(globalVars.apiEndPoint + '/user/comments?secret_token='+secret_token+'&reporteID='+reporteID)
    
    
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })


        
        .then(data => {
            console.log('respuesta: ', data)
            const html = data.map(comentario => {       
                return `
                <div class="comment">

                    <div class="user-data">
                        <img src="https://img.wattpad.com/cover/202910761-288-k713693.jpg" class="profile-picture"></img>
                        <div class="username"> ${comentario.name}
                        </div>
                    </div>
                    <div class="info-reporte">
                        <p clas="cuerpo-comentario"> ${comentario.cuerpo} </p>
                        <div class="fechas">
                        <p class="fecha-reporte-creado">creado: 10 de mayo</p>
                        <p class="fecha-reporte-editado">ultima edicion: 14 de mayo</p>
                    </div>

                </div>
            </div>
                `
            }).join("")
            console.log(html)
            document.querySelector('.comments-div')
            .insertAdjacentHTML('beforeend', html) 
        })
        .catch(error => {
            console.log(error)
        })
}

fetchData()