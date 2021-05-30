var secret_token = Cookies.get('secret_token')
var imageIds = []

function setImageIds(data) {
   imageIds = [...data]
}

const loadImages = async () => {
   try {
       const res = await fetch(globalVars.apiEndPoint + '/user/image?secret_token=' + secret_token)
       console.log(res)
       const data = await res.json()
       setImageIds(data)
       console.log(data)
   } catch (error) {
       console.log("Error fetching images")
       console.error(error)
   }
}

loadImages()