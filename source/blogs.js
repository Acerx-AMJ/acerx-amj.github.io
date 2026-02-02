// Again, too lazy to use JSON
const blogs = [{
   title: "How I Write C++",
   description: "I go over how I write C++, which guidelines I go by and where I learned all of this.",
   link: "../blogs/how_i_write_cpp.html",
   date: "January 31, 2026"
}]

document.addEventListener('DOMContentLoaded', () => {
   const blogdiv = document.getElementById("blogs")
   const searchbar = document.getElementById("search-bar")
   const badsearch = document.getElementById("bad-search")

    for (const blog of blogs) {
        blogdiv.innerHTML += `
        <a href="${blog.link}"><div>
            <pre>${blog.date}</pre>
            <h2>${blog.title}</h2>
            <p>${blog.description}</p>
        </div></a>
        `
    }

    searchbar.addEventListener('input', function() {
        const search = searchbar.value.toLowerCase()
        let foundany = false
        
        for (const blog of blogdiv.children) {
            const found = blog.getElementsByTagName("h2")[0].innerText.toLowerCase().includes(search)
                       || blog.getElementsByTagName("p" )[0].innerText.toLowerCase().includes(search)
            blog.style.display = (found ? "block" : "none")
            foundany = foundany || found
        }
        badsearch.style.display = (foundany ? "none" : "block")
    })
})