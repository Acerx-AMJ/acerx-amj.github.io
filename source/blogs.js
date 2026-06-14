// Again, too lazy to use JSON
const blogs = [{
    title: "Basic CPP Optimizations",
    description: "Basic CPP optimizations that work wonders.",
    link: "../blogs/basic_cpp_optimizations.html",
    date: "2026-06-14"
},{
    title: "Responsive Design in Raylib",
    description: "How I made my game look great on all desktop screen sizes.",
    link: "../blogs/responsive_design.html",
    date: "2026-04-05"
}]

document.addEventListener('DOMContentLoaded', () => {
    const projectdiv = document.getElementById("blogs")
    const searchbar = document.getElementById("search-bar")
    const badsearch = document.getElementById("bad-search")
    const projectbuttons = document.getElementById("project-buttons")

    const maxProjectsPerPage = 5
    let currentPage = 0
    let allEntries = []
    let filteredEntries = []

    for (const project of blogs) {
        const link = document.createElement('a')
        link.href = project.link
        link.innerHTML = `
            <pre>${project.date}</pre>
            <h2>${project.title}</h2>
            <p>${project.description}</p>`

        projectdiv.appendChild(link)
        allEntries.push(link)
        filteredEntries.push(link)
    }

    function showPage() {
        const start = currentPage * maxProjectsPerPage
        const end = start + maxProjectsPerPage

        for (const project of allEntries) {
            project.style.display = "none"
        }

        for (let i = 0; i < filteredEntries.length; i++) {
            const project = filteredEntries[i]
            project.style.display = (i >= start && i < end ? "block" : "none")
        }
        setupPageNumbers()
    }

    function setupPageNumbers() {
        projectbuttons.innerHTML = ''
        const pageCount = Math.ceil(filteredEntries.length / maxProjectsPerPage)
        if (pageCount == 1) return

        for (let i = 0; i < pageCount; i++) {
            const button = document.createElement('button')
            button.textContent = i + 1

            if (i == currentPage) button.className = "selected-btn"
            button.addEventListener('click', () => {
                let sh = document.documentElement.scrollHeight - window.scrollY
                currentPage = i
                showPage()
                window.scrollTo(0, document.documentElement.scrollHeight - sh)
            })
            projectbuttons.appendChild(button)
        }
    }

    showPage()

    searchbar.addEventListener('input', function() {
        const search = searchbar.value.toLowerCase()
        let foundany = false
        filteredEntries = []
        currentPage = 0
        
        for (const project of projectdiv.children) {
            if (project.getElementsByTagName("h2")[0].innerText.toLowerCase().includes(search)
             || project.getElementsByTagName("p" )[0].innerText.toLowerCase().includes(search)) {
                filteredEntries.push(project)
                foundany = true
            }
        }
        badsearch.style.display = (foundany ? "none" : "block")
        showPage()
    });
})