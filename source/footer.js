let startYear = 2026

document.addEventListener('DOMContentLoaded', () => {
   const body = document.getElementsByTagName('body')[0]
   let year = new Date().getFullYear()
   let yearText = (year <= startYear ? startYear : `${startYear}-${year}`)

   body.innerHTML += `
   <footer>
   <h1>© ${yearText} DANIEL VISHNEVSKY</h1>
   <p>This project is licensed under MIT License. See the full license <a href="https://github.com/Acerx-AMJ/acerx-amj.github.io/blob/main/LICENSE">here</a>.</p>

      <div>
         <a href="mailto:&#097;&#106;&#109;&#046;&#097;&#099;&#101;&#114;&#120;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;">Email</a>
         <a href="https://github.com/Acerx-AMJ/acerx-amj.github.io">Source</a>
         <a href="https://github.com/Acerx-AMJ">Github</a>
         <a href="https://acerxamj.itch.io/">Itch.io</a>
         <a href="https://www.youtube.com/@Acerx-AMJ">Youtube</a>
      </div>
   </footer>
   `
})
