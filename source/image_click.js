document.addEventListener("DOMContentLoaded", () => {
   const images = document.querySelectorAll("img");
   const ldSwitch = document.getElementById("ld-switch");
   const background = document.getElementById("img-background");
   const x = document.getElementById("x");

   x.src = "../assets/x.png";
   x.style.display = "none";
   background.style.display = "none";

   let current = null;
   let previousFromBottom = 0;

   function setImage(image) {
      previousFromBottom = document.documentElement.scrollHeight - window.scrollY;
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      
      ldSwitch.style.display = "none";
      background.style.display = "block";
      x.style.display = "block";
      image.className = "img-fullscreen";
      current = image;
   }

   function resetImage() {
      if (current === null) {
         return;
      }

      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      ldSwitch.style.display = "block";
      background.style.display = "none";
      x.style.display = "none";
      current.className = "";
      current = null;
      window.scrollTo(0, document.documentElement.scrollHeight - previousFromBottom);
   }

   for (const image of images) {
      if (!image.classList.contains('no-img-click')) {
         image.addEventListener("click", () => (current === null ? setImage(image) : resetImage()));
      }
   }

   x.addEventListener("click", () => {
      resetImage()
   });

   document.addEventListener("keyup", function(event) {
      let key = event.key || event.keyCode;
      if (key == "Escape") {
         resetImage();
      }
   });
});
