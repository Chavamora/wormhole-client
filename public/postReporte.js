console.log('1')

var submit = document.querySelector('#submit')
    
// submit.addEventListener("click", fetchData(), false) 
console.log('2')
function fetchData() {
    var titulo = document.querySelector('#titulo').value
    var descripcion = document.querySelector('#descripcion').value
    var user_id = document.querySelector('#user_id').value 

    if (document.getElementById('option-1').checked) {
       var tag_value = document.getElementById('option-1').value;
    } else {
       var tag_value = document.getElementById('option-2').value;
    }

    if (document.getElementById('option-3').checked) {
       var platform_value = document.getElementById('option-3').value;
    } else {
       var platform_value = document.getElementById('option-4').value;
    }

    reporte_info = {
        titulo: titulo,
        usuario: user_id,
        descripcion: descripcion,
        tags: [tag_value, platform_value, 'abierto']
    }

    console.log( JSON.stringify(reporte_info) )
    var secret_token = Cookies.get('secret_token') 
    fetch(globalVars.apiEndPoint + '/user/reportes?secret_token=' + secret_token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(reporte_info)
    })
    .then(res => {
        console.log('Response success!')
        console.log(typeof res)
        console.log(res)
        res.json()
        .then(body => console.log(body))
        .catch(error => console.log(error)) 
        console.log('token actual ' + Cookies.get('secret_token'))
        console.log('11')
        window.location.href="/reportes"
    })

    .catch(error => {
        console.error(":C")
        console.error(error)
    })
}


