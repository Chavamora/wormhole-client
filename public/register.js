
var submit = document.querySelector('#submit')

submit.addEventListener("click", fetchData(), false) 

function fetchData() {
    var email = document.querySelector('#email').value
    var nombre = document.querySelector('#name').value
    var password = document.querySelector('#password').value
    var password2 = document.querySelector('#password2').value

    new_user_info = {
        email: email,
        name: nombre,
        password: password,
        password2: password2
    }

    console.log( JSON.stringify(new_user_info) )


    // secret_token = cookies.get('secret_token')

    fetch(globalVars.apiEndPoint + '/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          // 'user_id': '1234'
        }, 
        body: JSON.stringify(new_user_info)
    })
    .then(res => {
        console.log('Response success!')
        console.log(typeof res)
        console.log(res)

        res.json()
        .then(body => console.log(body))
        .catch(error => console.log(error))

        return false
    })
    .catch(error => {
        console.error(":C")
        console.error(error)
    })
}
