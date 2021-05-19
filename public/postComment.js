
var submit = document.querySelector('#submit')
var reporteID = document.querySelector('#reporteID').textContent

    
function postComment() {
    var comentario = document.querySelector('#comment-body').value

     comment_info = {
         cuerpo: comentario,
         post_id: reporteID
    }

    console.log( JSON.stringify(comment_info) )
    var secret_token = Cookies.get('secret_token') 
    fetch(globalVars.apiEndPoint + '/user/comments?secret_token=' + secret_token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(comment_info)
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
        location.reload()
        return false
    })

    .catch(error => {
        console.error(":C")
        console.error(error)
    })
}


