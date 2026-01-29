let startYear = 2026

document.addEventListener('DOMContentLoaded', () => {
   let year = new Date().getFullYear()
   let yearText = (year <= startYear ? startYear : `${startYear}-${year}`)
   
   document.getElementById('copyright-notice').innerText = `© ${yearText} DANIEL VISHNEVSKY`
})
