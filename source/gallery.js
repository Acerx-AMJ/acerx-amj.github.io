let imageList = []
let imageIndex = 0
let selectedImage = null

function setImageToNull(screen) {
   document.documentElement.style.overflow = "auto"
   screen.classList = "h-full w-full fixed hidden"
   
   selectedImage.className = "cursor-pointer p-1"
   selectedImage = null
}

function setImage(screen, index) {
   document.documentElement.style.overflow = "hidden"
   screen.classList = "h-full w-full fixed block bg-zinc-900 top-0 left-0"

   imageIndex = index
   selectedImage = imageList[imageIndex]
   selectedImage.className = "cursor-pointer p-1 h-full w-full object-contain top-0 left-0 fixed mx-auto inset-x-0"
}

document.addEventListener("DOMContentLoaded", () => {
   const screen = document.getElementById("screen")
   const gallery = document.getElementById("gallery")
   gallery.className = "place-items-center grid grid-cols-2 p-5 my-5 bg-zinc-800 rounded-xl shadow-lg shadow-zinc-950";

   for (let i = 0; i < gallery.children.length; i++) {
      let image = gallery.children[i]
      imageList.push(image)
      image.className = "cursor-pointer p-1 rounded-xl hover:scale-103 transition transition-duration-100"

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