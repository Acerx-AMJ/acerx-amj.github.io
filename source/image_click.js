document.addEventListener("DOMContentLoaded", () => {
   const images = document.querySelectorAll("img:not(.img-no-click)");
   const article = document.querySelectorAll("article")[0];

   const background = document.createElement('div');
   background.id = "img-background";
   background.style.display = "none";
   article.appendChild(background);

   const x = document.createElement('img');
   x.id = "x";
   x.src = "../assets/x.png";
   x.style.display = "none";
   article.appendChild(x);

   let current = null;
   let previousFromBottom = 0;

   function setImage(image) {
      previousFromBottom = document.documentElement.scrollHeight - window.scrollY;
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      
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
      background.style.display = "none";
      x.style.display = "none";
      current.className = "";
      current = null;
      window.scrollTo(0, document.documentElement.scrollHeight - previousFromBottom);
   }

   for (const image of images) {
      image.addEventListener("click", () => (current === null ? setImage(image) : resetImage()));
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
