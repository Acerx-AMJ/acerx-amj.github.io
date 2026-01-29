let imageList = []
let imageIndex = 0
let selectedImage = null

function setImageToNull(screen) {
   screen.style.display = "none"

   selectedImage.className = ""
   selectedImage = null

   for (const image of imageList) {
      image.style.display = "block"
   }
}

function setImage(screen, index) {
   screen.style.display = "block"

   imageIndex = index
   selectedImage = imageList[imageIndex]
   selectedImage.className = "selected-img"

   for (let i = 0; i < gallery.children.length; i++) {
      let image = gallery.children[i]
      if (i != imageIndex) {
         image.style.display = "none";
      }
   }
}

document.addEventListener("DOMContentLoaded", () => {
   const screen = document.getElementById("screen")
   const gallery = document.getElementById("gallery")

   for (let i = 0; i < gallery.children.length; i++) {
      let image = gallery.children[i]
      imageList.push(image)

      image.addEventListener("click", () => {
         if (selectedImage != null) {
            setImageToNull(screen)
         } else {
            setImage(screen, i)
         }
      })
   }

   document.addEventListener("keyup", function(event) {
      if (selectedImage == null) return
      
      let key = event.key || event.keyCode
      if (key == "Escape") {
         setImageToNull(screen)
      } else if (key == "ArrowRight") {
         setImageToNull(screen)
         setImage(screen, (imageIndex + 1) % imageList.length)
      } else if (key == "ArrowLeft") {
         setImageToNull(screen)
         setImage(screen, (imageIndex == 0 ? imageList.length - 1 : imageIndex - 1))
      }
   })
})