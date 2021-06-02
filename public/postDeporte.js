var submit = document.querySelector('#submit')
    
// submit.addEventListener("click", fetchData(), false) 

function fetchData() {
    var nombre = document.querySelector('#nombre').value
    var ejercicio = document.querySelector('#ejercicio').value
    var series = document.querySelector('#series').value
    var desempeño = document.querySelector('#desempeño').value
    var notas = document.querySelector('#notas').value



    deporte_info = {
        nombre: nombre,
        ejercicio: ejercicio,
        series: series,
        desempeño: desempeño,
        notas: notas
        }

    console.log( JSON.stringify(deporte_info) )
    // secret_token = cookies.get('secret_token')
    var secret_token = Cookies.get('secret_token')
    fetch(globalVars.apiEndPoint + '/user/deportes?secret_token='+ secret_token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          // 'user_id': '1234'
        }, 
        body: JSON.stringify(deporte_info)
    })
    .then(res => {
        console.log('Response success!')
        console.log(typeof res)
        console.log(res)

        res.json()
        .then(body => console.log(body))
        .catch(error => console.log(error))
        
        console.log('token actual ' + Cookies.get('secret_token'))
        window.location.href="/users/deporte"

        // $.setCookie(secret_token)
        return false
    })
    .catch(error => {
        console.error(":C")
        console.error(error)
    })
}