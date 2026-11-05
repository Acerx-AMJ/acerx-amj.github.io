document.addEventListener("DOMContentLoaded", () => {
   const images = [...document.querySelectorAll("img:not(.img-no-click)")]; // convert to array
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

   let currentIndex = 0;
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

   for (let i = 0; i < images.length; ++i) {
      const image = images[i];
      image.addEventListener("click", () => {
         if (current === null) {
            setImage(image);
            currentIndex = i;
         }
         else {
            resetImage();
         }
      });
   }

   x.addEventListener("click", () => {
      resetImage()
   });

   document.addEventListener("keyup", function(event) {
      if (event.key == "Escape") {
         resetImage();
      }
      else if (event.key == 'ArrowLeft' && current !== null) {
         currentIndex = (currentIndex == 0 ? images.length - 1 : currentIndex - 1);
         resetImage();
         setImage(images[currentIndex]);
      }
      else if (event.key == 'ArrowRight' && current != null) {
         currentIndex = (currentIndex + 1) % images.length;
         resetImage();
         setImage(images[currentIndex]);
      }
   });
});
