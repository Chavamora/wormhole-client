var submit = document.querySelector('#submit')
    
// submit.addEventListener("click", fetchData(), false) 

function fetchData() {
    var nombre = document.querySelector('#nombre').value
    var horas_semana = document.querySelector('#horas_semana').value
    var notas = document.querySelector('#notas').value

    materia_info = {
        nombre: nombre,
        horas_semana: horas_semana,
        notas: notas
        }

    console.log( JSON.stringify(materia_info) )
    // secret_token = cookies.get('secret_token')
    var secret_token = Cookies.get('secret_token') //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwODc1MjhjYzM1ZTFkMmUyMDRjZDA0MCIsImVtYWlsIjoiMTIzNEBnbWFpbC5jb20ifSwiaWF0IjoxNjE5NjUzMjU5fQ.I7u9wcMtBIJJucxVEuMBUSjxeHXvuP17TWnl1Kc7fj0
    fetch(globalVars.apiEndPoint + '/user/materias?secret_token='+ secret_token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          // 'user_id': '1234'
        }, 
        body: JSON.stringify(materia_info)
    })
    .then(res => {
        console.log('Response success!')
        console.log(typeof res)
        console.log(res)

        res.json()
        .then(body => console.log(body))
        .catch(error => console.log(error))
        
        console.log('token actual ' + Cookies.get('secret_token'))
        
        // $.setCookie(secret_token)
        return false
    })
    .catch(error => {
        console.error(":C")
        console.error(error)
    })
}