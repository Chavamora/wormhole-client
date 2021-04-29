function fetchData() {
    var secret_token = Cookies.get('secret_token')
    fetch(globalVars.apiEndPoint + '/user/metas?secret_token=' + secret_token)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })
        .then(data => {
            console.log(data.data)
            const html = data.map(meta => {
                return `
                <a class="single" href="#">
                <div class="flex-table">
                    <div class="flex-item">
                        <p>${meta.responsable}</p>
                    </div>
                    <div class="flex-item">
                        <p>${meta.prioridad}</p>
                    </div>
                    <div class="flex-item">
                        <p>${meta.estado}</p>
                    </div>
                    <div class="flex-item">
                        <p>${meta.fecha_inicio}</p>
                    </div>
                    <div class="flex-item">
                        <p>${meta.fecha_final}</p>
                    </div>
                    <div class="flex-item">
                        <p>${meta.notas}</p>
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