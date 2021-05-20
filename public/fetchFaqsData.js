function fetchData() {
    var secret_token = Cookies.get('secret_token')
    fetch(globalVars.apiEndPoint + '/user/faqs?secret_token=' + secret_token)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })
        .then(data => {
            console.log(data.data)
            const html = data.map(faq => {
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
        })
        .catch(error => {
            console.log(error)
        })
}

fetchData()