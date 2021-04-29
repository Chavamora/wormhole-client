function fetchData() {
    var secret_token = Cookies.get('secret_token')
    fetch(globalVars.apiEndPoint + '/user/ruedaDeVida?secret_token=' + secret_token)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })
        .then(data => {
            console.log(data.data)
            const htmlRuedaDeVida = data.map((ruedaDeVida, ruedaDeVidaM) => {
                return `
                    <p id="crecimiento_personal">${ruedaDeVida.crecimiento_personal}</p>
                    <p id="negocios_estudios">${ruedaDeVida.negocios_estudios}</p>
                    <p id="familia">${ruedaDeVida.familia}</p>
                    <p id="salud">${ruedaDeVida.salud}</p>
                    <p id="amigos">${ruedaDeVida.amigos}</p>
                    <p id="recreacion_diversion">${ruedaDeVida.recreacion_diversion}</p>
                    <p id="amor">${ruedaDeVida.amor}</p>
                    <p id="contribucion">${ruedaDeVida.contribucion}</p>
                    <p id="finanzas">${ruedaDeVida.finanzas}</p>
                    <p id="espiritual">${ruedaDeVida.espiritual}</p>
                    <p id="user_id">${ruedaDeVida.user_id}</p>

                    <p id="crecimiento_personalM">${ruedaDeVidaM.crecimiento_personalM}</p>
                    <p id="negocios_estudiosM">${ruedaDeVidaM.negocios_estudiosM}</p>
                    <p id="familiaM">${ruedaDeVidaM.familiaM}</p>
                    <p id="saludM">${ruedaDeVidaM.saludM}</p>
                    <p id="amigosM">${ruedaDeVidaM.amigosM}</p>
                    <p id="recreacion_diversionM">${ruedaDeVidaM.recreacion_diversionM}</p>
                    <p id="amorM">${ruedaDeVidaM.amorM}</p>
                    <p id="contribucionM">${ruedaDeVidaM.contribucionM}</p>
                    <p id="finanzasM">${ruedaDeVidaM.finanzasM}</p>
                    <p id="espiritualM">${ruedaDeVidaM.espiritualM}</p>
                    <p id="user_id">${ruedaDeVidaM.user_id}</p>
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