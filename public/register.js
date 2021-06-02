
var submit = document.querySelector('#submit')

submit.addEventListener("click", fetchData(), false) 


function fetchData() {
    document.getElementById('messages').innerHTML = '<p></p>';

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
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data.errors[0]);
        const errorArray = data.errors;
        const html = 
                `
                <p class="error"> ${data.errors[0]} </p>
                `
            console.log(html)
            document.querySelector('#messages')
            .insertAdjacentHTML('beforeend', html) 

        })
        window.location.href ="/users/register"

        console.log(errorStr)
    .catch(error => {
        console.error(":C")
        console.error(error)
    })
}
