var submit = document.querySelector('#submit')
    
// submit.addEventListener("click", fetchData(), false) 

function fetchData() {
    var responsable = document.querySelector('#responsable').value
    var prioridad = document.querySelector('#prioridad').value
    var estado = document.querySelector('#estado').value
    var fecha_inicio = document.querySelector('#fecha_inicio').value
    var fecha_final = document.querySelector('#fecha_final').value
    var notas = document.querySelector('#notas').value


    meta_info = {
        responsable: responsable,
        prioridad: prioridad,
        estado: estado,
        fecha_inicio: fecha_inicio,
        fecha_final: fecha_final,
        notas: notas
        }

    console.log( JSON.stringify(meta_info) )
    // secret_token = cookies.get('secret_token')
    var secret_token = Cookies.get('secret_token')
    fetch(globalVars.apiEndPoint + '/user/metas?secret_token='+ secret_token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          // 'user_id': '1234'
        }, 
        body: JSON.stringify(meta_info)
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