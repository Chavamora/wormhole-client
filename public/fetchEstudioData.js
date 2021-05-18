function fetchData() {
    var secret_token = Cookies.get('secret_token')
    fetch(globalVars.apiEndPoint + '/user/materias?secret_token=' + secret_token)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })
        .then(data => {
            console.log(data.data)
            const html = data.map(materia => {
                return `
                <a class="single" href="#">
                <div class="flex-table">
                    <div class="flex-item">
                        <p>${materia.nombre}</p>
                    </div>
                    <div class="flex-item">
                        <p>${materia.horas_semana}</p>
                    </div>
                    <div class="flex-item">
                        <p>${materia.notas}</p>
                    </div>
                </div>
                </a>
                
                `
            }).join("")
            console.log(html)
            document.querySelector('.info')
            .insertAdjacentHTML('beforeend', html) 
        })
        .catch(error => {
            console.log(error)
        })
}

fetchData()