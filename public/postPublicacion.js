var submit = document.querySelector('#submitPost')
var secret_token = Cookies.get('secret_token')
// Select your input type file and store it in a variable
const input = document.getElementById('image');
var previewSource = ""

// This will upload the file after having read it
const setPreviewSource = (source) => {
  previewSource = source
  console.log(previewSource)
  document.getElementById('postFoto').innerHTML = `<img src="${previewSource}" id="postPreview">  `

  return previewSource
}


submit.addEventListener('click', e => {
  console.log('1')
  handleSubmitFile(e)
})
input.addEventListener('change', e => {
  handleFileInputChange(e)
})
const handleFileInputChange = (e) => {
  const file = e.target.files[0]
  previewFile(file)
}

const previewFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file)
  reader.onloadend = () => 
    setPreviewSource(reader.result)
}

const handleSubmitFile = (e) => {
  e.preventDefault()
  if(!previewSource) {
    uploadImage()
  } else {
  uploadImage(previewSource)
  }
}

const uploadImage = (base64EncodedImage) => {

  if(base64EncodedImage) {
    console.log('ENVIANDO', base64EncodedImage)
    const cuerpo = document.querySelector('#postContentInput').value
  
  
    fetch(globalVars.apiEndPoint + '/user/publicaciones?secret_token='+ secret_token, { // Your POST endpoint
          method: 'POST',
          headers: {
             "Content-Type": "application/json"
          },
          body:  JSON.stringify({cuerpo: cuerpo, data: base64EncodedImage}) // This is your file object
        })
        .then(res => {
          console.log('Response success!')
          console.log(typeof res)
          console.log(res)
  
          res.json()
          .then(body => console.log(body))
          .catch(error => console.log(error))
          
          console.log('token actual ' + Cookies.get('secret_token'))
          location.reload()
          // $.setCookie(secret_token)
          return false
      })
  } else{
    console.log('ENVIANDO')
    const cuerpo = document.querySelector('#postContentInput').value
  
  
    fetch(globalVars.apiEndPoint + '/user/publicaciones?secret_token='+ secret_token, { // Your POST endpoint
          method: 'POST',
          headers: {
             "Content-Type": "application/json"
          },
          body:  JSON.stringify({cuerpo: cuerpo}) // This is your file object
        })
        .then(res => {
          console.log('Response success!')
          console.log(typeof res)
          console.log(res)
  
          res.json()
          .then(body => console.log(body))
          .catch(error => console.log(error))
          
          console.log('token actual ' + Cookies.get('secret_token'))
          location.reload()
          // $.setCookie(secret_token)
          return false
      })
  }

}

