var submit = document.querySelector('#submit')
    
// submit.addEventListener("click", fetchData(), false) 

function fetchData() {
    var titulo = document.querySelector('#titulo').value
    var descripcion = document.querySelector('#descripcion').value
    var cuerpo = document.querySelector('#cuerpo').value

    blog_info = {
        titulo: titulo,
        descripcion: descripcion,
        cuerpo: cuerpo
        }

    console.log( JSON.stringify(blog_info) )
    // secret_token = cookies.get('secret_token')
    var secret_token = Cookies.get('secret_token')
    fetch(globalVars.apiEndPoint + '/user/blogs?secret_token='+ secret_token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          // 'user_id': '1234'
        }, 
        body: JSON.stringify(blog_info)
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