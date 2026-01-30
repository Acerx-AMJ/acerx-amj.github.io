let imageList = []
let imageIndex = 0
let selectedImage = null

function setImageToNull(screen, larrow, rarrow) {
   screen.id = "gallery"
   larrow.style.display = "none"
   rarrow.style.display = "none"

   selectedImage.className = ""
   selectedImage = null

   for (const image of imageList) {
      image.style.display = "block"
   }
}

function setImage(screen, larrow, rarrow, index) {
   screen.id = "screen"
   larrow.style.display = "block"
   rarrow.style.display = "block"

   imageIndex = index
   selectedImage = imageList[imageIndex]
   selectedImage.className = "selected-img"

   for (let i = 0; i < screen.children.length - 2; i++) {
      let image = screen.children[i]
      if (i != imageIndex) {
         image.style.display = "none";
      }
   }
}

function selectImageLeft(gallery, larrow, rarrow) {
   setImageToNull(gallery, larrow, rarrow)
   setImage(gallery, larrow, rarrow, (imageIndex == 0 ? imageList.length - 1 : imageIndex - 1))
}

function selectImageRight(gallery, larrow, rarrow) {
   setImageToNull(gallery, larrow, rarrow)
   setImage(gallery, larrow, rarrow, (imageIndex + 1) % imageList.length)
}

document.addEventListener("DOMContentLoaded", () => {
   const gallery = document.getElementById("gallery")
   const larrow = document.getElementById("left-arrow")
   const rarrow = document.getElementById("right-arrow")

   larrow.src = "../assets/left-arrow.png"
   rarrow.src = "../assets/right-arrow.png"

   for (let i = 0; i < gallery.children.length - 2; i++) {
      let image = gallery.children[i]

      imageList.push(image)

      image.addEventListener("click", () => {
         if (selectedImage != null) {
            setImageToNull(gallery, larrow, rarrow)
         } else {
            setImage(gallery, larrow, rarrow, i)
         }
      })
   }

   document.addEventListener("keyup", function(event) {
      if (selectedImage == null) return
      
      let key = event.key || event.keyCode
      if (key == "Escape") {
         setImageToNull(gallery, larrow, rarrow)
      } else if (key == "ArrowRight") {
         selectImageRight(gallery, larrow, rarrow)
      } else if (key == "ArrowLeft") {
         selectImageLeft(gallery, larrow, rarrow)
      }
   })

   larrow.addEventListener("click", () => {
      selectImageLeft(gallery, larrow, rarrow)
   })

   rarrow.addEventListener("click", () => {
      selectImageRight(gallery, larrow, rarrow)
   })
})