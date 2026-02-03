// Too lazy to use JSON
const projects = [{
    title: "Sandbox-2D",
    description: "Build whatever your heart desires, survive the environment or simply play around - it's up to you. Sandbox-2D is a sandbox survival game where you can build, destroy and explore. Made with C++ and Raylib.",
    image: "../assets/sandbox2d_12.png",
    link: "../projects/sandbox2d.html",
}, {
    title: "Block Placer",
    description: "Game heavily inspired by Tetris. Play solo, battle against friends in versus or work together in co-op mode! Made with C++ and Raylib.",
    image: "../assets/block_placer_4.png",
    link: "../projects/block_placer.html",
}, {
    title: "Pong",
    description: "Pong. What more is there to say? Battle against a friend or go against a bot of 4 different difficulties. Made with C++ and SFML.",
    image: "../assets/pong_2.png",
    link: "../projects/pong.html"
}, {
    title: "Astral Surge",
    description: "Speedrunning game focused on collecting all coins in time while evading traps and enemies. Features a fully-fledged level editor and endless mode! Made with C++ and SFML.",
    image: "../assets/astral_surge_3.png",
    link: "../projects/astral_surge.html",
}, {
    title: "Astral Surge",
    description: "Speedrunning game focused on collecting all coins in time while evading traps and enemies. Features a fully-fledged level editor and endless mode! Made with C++ and SFML.",
    image: "../assets/astral_surge_3.png",
    link: "../projects/astral_surge.html",
}, {
    title: "Astral Surge",
    description: "Speedrunning game focused on collecting all coins in time while evading traps and enemies. Features a fully-fledged level editor and endless mode! Made with C++ and SFML.",
    image: "../assets/astral_surge_3.png",
    link: "../projects/astral_surge.html",
}, {
    title: "Astral Surge",
    description: "Speedrunning game focused on collecting all coins in time while evading traps and enemies. Features a fully-fledged level editor and endless mode! Made with C++ and SFML.",
    image: "../assets/astral_surge_3.png",
    link: "../projects/astral_surge.html",
}, {
    title: "Astral Surge",
    description: "Speedrunning game focused on collecting all coins in time while evading traps and enemies. Features a fully-fledged level editor and endless mode! Made with C++ and SFML.",
    image: "../assets/astral_surge_3.png",
    link: "../projects/astral_surge.html",
}, {
    title: "Astral Surge",
    description: "Speedrunning game focused on collecting all coins in time while evading traps and enemies. Features a fully-fledged level editor and endless mode! Made with C++ and SFML.",
    image: "../assets/astral_surge_3.png",
    link: "../projects/astral_surge.html",
}, {
    title: "Astral Surge",
    description: "Speedrunning game focused on collecting all coins in time while evading traps and enemies. Features a fully-fledged level editor and endless mode! Made with C++ and SFML.",
    image: "../assets/astral_surge_3.png",
    link: "../projects/astral_surge.html",
}, {
    title: "Astral Surge",
    description: "Speedrunning game focused on collecting all coins in time while evading traps and enemies. Features a fully-fledged level editor and endless mode! Made with C++ and SFML.",
    image: "../assets/astral_surge_3.png",
    link: "../projects/astral_surge.html",
}, {
    title: "Astral Surge",
    description: "Speedrunning game focused on collecting all coins in time while evading traps and enemies. Features a fully-fledged level editor and endless mode! Made with C++ and SFML.",
    image: "../assets/astral_surge_3.png",
    link: "../projects/astral_surge.html",
}]

document.addEventListener("DOMContentLoaded", () => {
    const projectdiv = document.getElementById("projects")
    const searchbar = document.getElementById("search-bar")
    const badsearch = document.getElementById("bad-search")
    const projectbuttons = document.getElementById("project-buttons")

    const maxProjectsPerPage = 5
    let currentPage = 0
    let allEntries = []
    let filteredEntries = []

    for (const project of projects) {
        const div = document.createElement('div')
        div.innerHTML = `
            <h2>${project.title}</h2>
            <a href="${project.link}"><img src="${project.image}"/></a>
            <p>${project.description}</p>
            <a href="${project.link}">Learn More</a>`

        projectdiv.appendChild(div)
        allEntries.push(div)
        filteredEntries.push(div)
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
        const pageCount = Math.ceil(filteredEntries.length / maxProjectsPerPage) // Fuck Javascript
        if (pageCount == 1) return // Fuck off

        for (let i = 0; i < pageCount; i++) {
            const button = document.createElement('button')
            button.textContent = i + 1

            if (i == currentPage) button.className = "selected-btn"
            button.addEventListener('click', () => {
                currentPage = i
                showPage()
                window.scrollTo(0, document.body.scrollHeight)
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
