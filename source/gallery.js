let selectedImage = null

function setImageToNull(screen) {
   document.documentElement.style.overflow = "auto"
   screen.classList = "h-full w-full fixed hidden"
   
   selectedImage.className = "cursor-pointer p-1"
   selectedImage = null
}

function setImage(screen, image) {
   document.documentElement.style.overflow = "hidden"
   screen.classList = "h-full w-full fixed block bg-zinc-900 top-0 left-0"

   image.className = "cursor-pointer p-1 h-full w-full object-contain top-0 left-0 fixed mx-auto inset-x-0"
   selectedImage = image
}

document.addEventListener("DOMContentLoaded", () => {
   const gallery = document.getElementById("gallery")
   const screen = document.getElementById("screen")

   for (const image of gallery.children) {
      image.className = "cursor-pointer p-1"

      image.addEventListener("click", () => {
         if (selectedImage != null) {
            setImageToNull(screen)
         } else {
            setImage(screen, image)
         }
      })
   }

   document.addEventListener("keyup", function(event) {
      let key = event.key || event.keyCode
      if (selectedImage != null && key == "Escape") {
         setImageToNull(screen)
      }
   })
})