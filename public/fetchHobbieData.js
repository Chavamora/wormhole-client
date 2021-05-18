function fetchData() {
    var secret_token = Cookies.get('secret_token')
    fetch(globalVars.apiEndPoint + '/user/hobbies?secret_token=' + secret_token)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })
        .then(data => {
            console.log(data.data)
            const html = data.map(hobbie => {
                return `
                <a class="single" href="#">
                <div class="flex-table">
                    <div class="flex-item">
                        <p>${hobbie.nombre}</p>
                    </div>
                    <div class="flex-item">
                        <p>${hobbie.descripcion}</p>
                    </div>
                    <div class="flex-item">
                        <p>${hobbie.notas}</p>
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