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
            console.log('Login successful!')
            console.log(res, res.body)
    
            res.json()
            .then(body => Cookies.set('secret_token', body.token, { sameSite: 'none', secure: 'true'}))
            .then(() => {
                console.log('token actual ' + Cookies.get('secret_token'));
                window.location.href="/users/perfil"
            })
           
            .catch(error => console.log(error))
            
            
        // $.setCookie(secret_token)
            return false
        })
        .catch(error => {
            console.error("Error in login")
            console.error(error)
        })

        // window.location.href = "/users/perfil";
    }
