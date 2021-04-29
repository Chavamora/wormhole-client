var submit = document.querySelector('#submit')
    
    // submit.addEventListener("click", fetchData(), false) 
    
    function fetchData() {
        var email = document.querySelector('#email').value
        var password = document.querySelector('#password').value
    
        user_info = {
            email: email,
            password: password     
        }
    
        console.log( JSON.stringify(user_info) )
        // secret_token = cookies.get('secret_token')
    
        fetch(globalVars.apiEndPoint + '/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
              // 'user_id': '1234'
            }, 
            body: JSON.stringify(user_info)
        })
        .then(res => {
            console.log('Response success!')
            console.log(typeof res)
            console.log(res)
    
            res.json()
            .then(body => Cookies.set('secret_token', body.token, { sameSite: 'none', secure: 'true'}))
            .catch(error => console.log(error))
            
            console.log('token actual ' + Cookies.get('secret_token'))
            
            // $.setCookie(secret_token)
            return false
        })
        .catch(error => {
            console.error(":C")
            console.error(error)
        })

        // window.location.href = "/users/perfil";
    }
