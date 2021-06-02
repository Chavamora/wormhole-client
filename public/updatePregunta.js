const faqID = document.querySelector('#faqID').textContent
 
        
function fetchData() {
    var secret_token = Cookies.get('secret_token')
    fetch(globalVars.apiEndPoint + '/user/faqs?secret_token=' + secret_token)

    
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })

        .then(data => {
            console.log(data)

            const html = data.map(pregunta => {
                
                if(pregunta._id == faqID) {
                return `
                <div id="sugerenciaForm">
                <label for="titulo">Modifica la pregunta</label>
                <input type="text" placeholder="Modifica la pregunta" name="titulo" class="sugerenciaPregunta"
                    autocomplete="off" id="tituloInput" value="${pregunta.titulo}" required>
                    <label for="respuesta">Modifica la respuesta</label>
                <input type="text" placeholder="Modifica la respuesta" name="respuesta" class="sugerenciaPregunta"
                autocomplete="off" id="respuestaInput" value="${pregunta.respuesta}" required>
                <input type="submit" value="Actualizar" id="sugerenciaSubmit">
            </div>
                `
                }
            }).join("")
            console.log(html)
            document.querySelector('.preguntas')
            .insertAdjacentHTML('beforeend', html) 
            
            const submitNew = document.querySelector('#sugerenciaSubmit')
            submitNew.addEventListener('click', e => {
                        const newFaq ={
                        titulo:document.querySelector('#tituloInput').value,
                        respuesta:  document.querySelector('#respuestaInput').value
                        }
                        console.log( document.querySelector('#respuestaInput').value)
                        console.log( document.querySelector('#tituloInput').value)

                        console.log(newFaq)
                    fetch(globalVars.apiEndPoint + '/user/faqs/modificar/' + faqID +'?secret_token=' + secret_token, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        }, 
                        body: JSON.stringify(newFaq)
                    })
                    .then(res => {
                        console.log('Response success!')
                        console.log(typeof res)
                        console.log(res)
                        
                            res.json()
                            .then(body => {
                                if (body.error) {
                                    console.log(body.error)
                                    alert(body.error)
                                } else {  
                                console.log('token actual ' + Cookies.get('secret_token'))
                                console.log('11')
                                window.location.href="/users/faqs/editar"
                                }
                            })
                            
                            .catch(error => console.log(error))   
                        
                    })
               
                })
        })
        .catch(error => {
            console.log(error)
        })
}    fetchData()

// const modificar = document.querySelector('#submit')
// modificar.addEventListener('click', e => {
//     fetch(globalVars.apiEndPoint + '/user/faqs/modificar/?secret_token=' + secret_token, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         }, 
//         body: JSON.stringify(reporte_info)
//     })
//     .then(res => {
//         console.log('Response success!')
//         console.log(typeof res)
//         console.log(res)
        
//             res.json()
//             .then(body => {
//                 if (body.error) {
//                     console.log(body.error)
//                     alert(body.error)
//                 } else {
                    
//                 console.log('token actual ' + Cookies.get('secret_token'))
//                 console.log('11')
//                 window.location.href="/reportes"  
//                 }
//             })
            
//             .catch(error => console.log(error))   
        
//     })

//     .catch(error => {
//         console.error(":C")
//         console.error(error)
//     })
// })