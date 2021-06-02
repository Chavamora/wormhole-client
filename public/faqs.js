const editarBtn = document.querySelector('#edit')

function fetchData() {
    var secret_token = Cookies.get('secret_token')
    var monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    fetch(globalVars.apiEndPoint + '/user/faqs?secret_token=' + secret_token)

    
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })

        .then(data => {
            var tipo = data.pop()
            console.log(data)
            if (tipo == 2) {
            editarBtn.style.display = 'flex'
            const html = data.map(pregunta => {       
                return `
                <div class="pregunta">
                <p class="fecha-pregunta">
                    ${pregunta.createdAt}
                </p>
                <h2 class="titulo-pregunta">
                ${pregunta.titulo}
                </h2>
                <div class="border"> </div>

                <p class="respuesta-pregunta">
                ${pregunta.respuesta}
                </p>
            </div> 
                `

            }).join("")
            console.log(html)
            document.querySelector('.preguntas')
            .insertAdjacentHTML('beforeend', html) 
            

        } else {
            const html = data.map(pregunta => {       
                return `
                <div class="pregunta">
                <p class="fecha-pregunta">
                    ${pregunta.createdAt}
                </p>
                <h2 class="titulo-pregunta">
                ${pregunta.titulo}
                </h2>
                <div class="border"> </div>

                <p class="respuesta-pregunta">
                ${pregunta.respuesta}
                </p>
            </div> 
                `

            }).join("")
            console.log(html)
            document.querySelector('.preguntas')
            .insertAdjacentHTML('beforeend', html) 
        }

        })
        .catch(error => {
            console.log(error)
        })
}    fetchData()







