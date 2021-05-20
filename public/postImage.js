// var submit = document.querySelector('#submit')
// var secret_token = Cookies.get('secret_token')



// document.querySelector('#image').addEventListener('change', event => {
//   handleImageUpload(event)
//      })

//      const handleImageUpload = event => {
//       const files = event.target.files
//       const file = files[0]
//       const file_name = file.name
//       const formData = new FormData()
//       formData.append('myFile', files)
     
     
// fetch(globalVars.apiEndPoint + '/user/image?secret_token='+ secret_token, {
//          method: 'POST',
//          body: formData
//        })
//        .then(response => response.json())
//        .then(data => {
//          console.log(data)
//        })
//        .catch(error => {
//          console.error(error)
//        })
//       }


      //  submit.addEventListener("click", fetchData(), false) 
      //   function postImage() {
      //   setImagePath = e => {
      //       let reader = new FileReader() 
      //       reader.readAsDataURL(e.target.files[0])
           
           
      //       reader.onload = () => {      
      //        this.setState({        
      //         queryImage: reader.result      
      //        },()=> this.postIdentification())    
      //     }}
      //   }






























// document.querySelector('#image').addEventListener('change', event => {
//     handleImageUpload(event)
//   })

// console.log(1)

//   const handleImageUpload = event => {

    
//     const files = event.target.files


//     console.log(files)
//     console.log(file_name)
//      const formData = new FormData()
//      filesJSON = JSON.stringify(files)
//      console.log(JSON.stringify(files))
//      console.log('.item() ' + files.item(0))
//      formData.append('myFile', files)
//      console.log(JSON.stringify(formData))
//      console.log(2)
//      console.log(typeof files)

//      var myReader = new FileReader();
//      myReader.onload = function(event){
//          console.log(JSON.stringify(myReader.result))
//          var blobImg = myReader.result
//          console.log('imagen blob: ' + blobImg)
//      };
//      myReader.readAsText(files[0]);

    


     
    
//     fetch(globalVars.apiEndPoint + '/user/image?secret_token='+ secret_token, {
//       method: 'POST',
//       body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data)
//     })
//     .catch(error => {
//       console.error(error)
//     })
//   }
  
// submit.addEventListener("click", fetchData(), false) 
// function postImage() {
// setImagePath = e => {
//     let reader = new FileReader() 
//     reader.readAsDataURL(e.target.files[0])
    
    
//     reader.onload = () => {      
//      this.setState({        
//       queryImage: reader.result      
//      },()=> this.postIdentification())    
//    }}

//    fetch(globalVars.apiEndPoint + '/user/image?secret_token='+ secret_token, {                      
//     method: "POST",  
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(queryImage)
//     })
//     .then(res => res.json())
//     .then(data => {
//           console.log(data)
//          })      
     

//         }
    // var nombre = document.querySelector('#nombre').value
    // var horas_semana = document.querySelector('#horas_semana').value
    // var notas = document.querySelector('#notas').value



    
         

    

    
    // image_info = {
    //     name: 'pruebaname',
    //     desc: 'pruebadesc',
    //     img: {
    //         data: fs.readFileSync(path.join(__dirname + '/uploads/' + file.filename)),
    //         contentType: 'image/png'
    //     }
    // }
    
    

    
    // console.log( JSON.stringify(materia_info) )
    // // secret_token = cookies.get('secret_token')
    // var secret_token = Cookies.get('secret_token') //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwODc1MjhjYzM1ZTFkMmUyMDRjZDA0MCIsImVtYWlsIjoiMTIzNEBnbWFpbC5jb20ifSwiaWF0IjoxNjE5NjUzMjU5fQ.I7u9wcMtBIJJucxVEuMBUSjxeHXvuP17TWnl1Kc7fj0
    // fetch(globalVars.apiEndPoint + '/user/image?secret_token='+ secret_token, {
    //     method: 'POST',
    //     enctype: 'multipart/form-data',
    //     headers: {
    //       'Content-Type': 'application/json', 
    //       // 'user_id': '1234'
    //     }, 
    //     body: JSON.stringify(image_info)
    // })
    // .then(res => {
    //     console.log('Response success!')
    //     console.log(typeof res)
    //     console.log(res)

    //     res.json()
    //     .then(body => console.log(body))
    //     .catch(error => console.log(error))
        
    //     console.log('token actual ' + Cookies.get('secret_token'))
        
    //     // $.setCookie(secret_token)
    //     return false
    // })
    // .catch(error => {
    //     console.error(":C")
    //     console.error(error)
    // })
