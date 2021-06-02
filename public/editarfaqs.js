
function fetchData() {
    var secret_token = Cookies.get('secret_token')
    var monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    fetch(globalVars.apiEndPoint + '/user/faqs?secret_token=' + secret_token)

    
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })

        .then(data => {
            var tipo = data.pop()
            console.log(data)

            const html = data.map(pregunta => {       
                return `
                <div class="pregunta-botones">
                        <div class="pregunta">
                            <p class="fecha-pregunta">
                                ${pregunta.createdAt}
                            </p>
                            <h2 class="titulo-pregunta">
                            ${pregunta.titulo}
                            </h2>
                            <div class="border"> </div>

                            <p class="respuesta-pregunta">
                            ${pregunta.respuesta}
                            </p>
                        </div>
                        <div class="botones">

                            
                            <a class="modify" href="/users/faqs/editar/${pregunta._id}" id="modificar" style="height: 16px;"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16" >
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                              </svg> Modificar </a>
                            <a class="delete" data-doc="${pregunta._id}" id="borrar" style="height: 16px;"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg> 

                                Borrar
                            </a>
                        </div>
                    </div>
                `

            }).join("")
            console.log(html)
            document.querySelector('.preguntas')
            .insertAdjacentHTML('beforeend', html) 
            
            const eliminar = document.querySelectorAll('.delete')
            eliminar.forEach(element => {
                element.addEventListener('click', e => {
                    console.log('hola')
                    faqID = e.target.dataset.doc
                    fetch(globalVars.apiEndPoint + '/user/faqs/modificar/' + faqID +'?secret_token=' + secret_token, {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        }, 
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
                
                    .catch(error => {
                        console.error(":C")
                        console.error(error)
                    })
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










