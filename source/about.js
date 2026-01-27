const links = [{
   id: "link-block-placer",
   image: "../assets/block_placer_4.png"
}, {
   id: "link-sandbox2d",
   image: "../assets/sandbox2d_12.png"
}]

document.addEventListener("DOMContentLoaded", () => {
   const image = document.getElementById("link-preview")
   
   for (const link of links) {
      const element = document.getElementById(link.id)

      element.addEventListener("mouseover", () => {
         image.src = link.image
         image.style.display = "inline"
         image.style.pointerEvents = "none"
         image.style.opacity = "100%"

         let rect = element.getBoundingClientRect()
         let img = image.getBoundingClientRect()
         
         image.style.left = rect.left + rect.width / 2.0 - img.width / 2.0 + "px"
         image.style.top = rect.top + rect.height + "px"
      })

      element.addEventListener("mouseout", () => {
         image.style.display = "none"
         image.style.opacity = "0%"
      })
   }
})
