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
}]

document.addEventListener("DOMContentLoaded", () => {
    const projectdiv = document.getElementById("projects")
    const searchbar = document.getElementById("search-bar")
    const badsearch = document.getElementById("bad-search")

    for (const project of projects) {
        projectdiv.innerHTML += `
        <div>
            <h2>${project.title}</h2>
            <a href="${project.link}"><img src="${project.image}"/></a>
            <p>${project.description}</p>
            <a href="${project.link}">Learn More</a>
        </div>
        `
    }

    searchbar.addEventListener('input', function() {
        const search = searchbar.value.toLowerCase()
        let foundany = false
        
        for (const project of projectdiv.children) {
            const found = project.getElementsByTagName("h2")[0].innerText.toLowerCase().includes(search)
                       || project.getElementsByTagName("p" )[0].innerText.toLowerCase().includes(search)
            project.style.display = (found ? "block" : "none")
            foundany = foundany || found
        }
        badsearch.style.display = (foundany ? "none" : "block")
    })
})
