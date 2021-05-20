var submit = document.querySelector('#submit')
    
// submit.addEventListener("click", fetchData(), false) 

function fetchData() {
    var titulo = document.querySelector('#titulo').value
    var respuesta = document.querySelector('#respuesta').value

    faq_info = {
        titulo: titulo,
        respuesta: respuesta,
    }

    console.log( JSON.stringify(faq_info) )
    // secret_token = cookies.get('secret_token')
    var secret_token = Cookies.get('secret_token') //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwODc1MjhjYzM1ZTFkMmUyMDRjZDA0MCIsImVtYWlsIjoiMTIzNEBnbWFpbC5jb20ifSwiaWF0IjoxNjE5NjUzMjU5fQ.I7u9wcMtBIJJucxVEuMBUSjxeHXvuP17TWnl1Kc7fj0
    fetch(globalVars.apiEndPoint + '/user/faqs?secret_token='+ secret_token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          // 'user_id': '1234'
        }, 
        body: JSON.stringify(faq_info)
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