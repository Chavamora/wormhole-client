function fetchData() {
    var secret_token = Cookies.get('secret_token')
    fetch(globalVars.apiEndPoint + '/user/perfil?secret_token=' + secret_token)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })
        .then(data => {
            console.log(data.data)
            const html = data.map(user => {
                return `
                <h1 class="profileName"> ${user.name} </h1>
                <h2 class="profileEmail"> ${user.email} </h2>
                `
            }).join("")
            console.log(html)
            document.querySelector('#profileDescription')
            .insertAdjacentHTML('afterbegin', html) 
        })
        .catch(error => {
            console.log(error)
        })
}

fetchData()
