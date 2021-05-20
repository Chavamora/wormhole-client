var submit = document.querySelector('#submit')
var secret_token = Cookies.get('secret_token')
// Select your input type file and store it in a variable
const input = document.getElementById('image');
var previewSource = ""

// This will upload the file after having read it
const setPreviewSource = (source) => {
  previewSource = source
  console.log(previewSource)
  document.getElementById('previewImage').innerHTML = `<img src="${previewSource}"></img>`

  return previewSource
}


submit.addEventListener('click', e => {
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
  if(!previewSource) return
  uploadImage(previewSource)
}

const uploadImage = (base64EncodedImage) => {
  console.log('ENVIANDO', base64EncodedImage)

  fetch(globalVars.apiEndPoint + '/user/image?secret_token='+ secret_token, { // Your POST endpoint
        method: 'POST',
        headers: {
           "Content-Type": "application/json"
        },
        body:  JSON.stringify({data: base64EncodedImage}) // This is your file object
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





// const upload = (file) => {
//   fetch(globalVars.apiEndPoint + '/user/image?secret_token='+ secret_token, { // Your POST endpoint
//     method: 'POST',
//     headers: {
//       // Content-Type may need to be completely **omitted**
//       // or you may need something
//        "Content-Type": "application/json"
//     },
//     body:  JSON.stringify(image_info) // This is your file object
//   }).then(
//     response => response.json() // if the response is a JSON object
//   ).then(
//     success => console.log(success) // Handle the success response object
//   ).catch(
//     error => console.log(error) // Handle the error response object
//   );
// };

// // Event handler executed when a file is selected
// const onSelectFile = () => upload(input.files[0]);

// // Add a listener on your input
// // It will be triggered when a file will be selected
// input.addEventListener('change', onSelectFile, false);


