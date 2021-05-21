var secret_token = Cookies.get('secret_token')
var imageIds = []

function setImageIds(data) {
   imageIds = [...data]
}

const loadImages = async () => {
   try {
       const res = await fetch(globalVars.apiEndPoint + '/user/image?secret_token=' + secret_token)
       const data = await res.json()
       setImageIds(data)
       console.log(data)
   } catch (error) {
       console.error(error)
   }
}

loadImages()