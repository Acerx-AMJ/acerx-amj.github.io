document.addEventListener("DOMContentLoaded", () => {
   const gallery = document.getElementById("gallery")
   const larrow = document.getElementById("left-arrow")
   const rarrow = document.getElementById("right-arrow")

   let imageList = []
   let imageIndex = 0
   let selectedImage = null

   // Image functions

   function setImageToNull() {
      for (const image of imageList) {
         image.style.display = "block"
      }

      gallery.id = "gallery"
      larrow.style.display = "none"
      rarrow.style.display = "none"

      selectedImage.className = ""
      selectedImage = null
   }

   function setImage(index) {
      for (const image of imageList) {
         image.style.display = "none"
      }

      gallery.id = "screen"
      larrow.style.display = "block"
      rarrow.style.display = "block"

      imageIndex = index
      selectedImage = imageList[imageIndex]
      selectedImage.className = "selected-img"
      selectedImage.style.display = "block"
   }

   function selectImageLeft() {
      setImageToNull()
      setImage(imageIndex == 0 ? imageList.length - 1 : imageIndex - 1)
   }

   function selectImageRight() {
      setImageToNull()
      setImage((imageIndex + 1) % imageList.length)
   }

   // Setup code

   larrow.src = "../assets/left-arrow.png"
   rarrow.src = "../assets/right-arrow.png"

   for (let i = 0; i < gallery.children.length - 2; i++) {
      let image = gallery.children[i]
      imageList.push(image)
      image.addEventListener("click", () => selectedImage == null ? setImage(i) : setImageToNull())
   }

   document.addEventListener("keyup", function(event) {
      if (selectedImage == null) return
      
      let key = event.key || event.keyCode
      if (key == "Escape") {
         setImageToNull()
      } else if (key == "ArrowRight") {
         selectImageRight()
      } else if (key == "ArrowLeft") {
         selectImageLeft()
      }
   })

   larrow.addEventListener("click", () => {
      selectImageLeft()
   })

   rarrow.addEventListener("click", () => {
      selectImageRight()
   })
})
