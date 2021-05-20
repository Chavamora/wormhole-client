function fetchData() {
    var secret_token = Cookies.get('secret_token')
    fetch(globalVars.apiEndPoint + '/user/image?secret_token=' + secret_token)
        .then(response => {
            console.log(response.body)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })
        .then(data => {
            console.log(data) 
            const html =
                 `
                <div>
                    <img src="data:image/${'jpg'};base64,${data.dataBase64}">
                <div>
                <h5>${data.user_id}</h5>
                `
            
            console.log(html)
            document.querySelector('.info')
            .insertAdjacentHTML('beforeend', html) 
        })
        .catch(error => {
            console.log(error)
        })
}

fetchData()


// function fetchData() {
//     var secret_token = Cookies.get('secret_token')
//     fetch(globalVars.apiEndPoint + '/user/image?secret_token=' + secret_token)
//     console.log('1')
//         .then(res => {
//             console.log('2')

//             console.log('respuesta: ', res.body)
//             if (!res.ok) {
//                 throw Error('ERROR')
//             }
//             else {
//             const div = document.createElement('div')
//             div.innerHTML = `
//                 <div>
//                 <img src="data:image/${'jpg'};base64,${res.body.dataBase64}">
//                 <div>
//                     <h5>${image.user_id}</h5>
//                 `
//             console.log(div)
//             document.querySelector('.info')
//             .insertAdjacentHTML('beforeend', div) 
//             }
           
//         })
//         .then(() => {
            
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }

// fetchData()

