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

    // Load all projects dynamically
    for (const project of projects) {
        // Create the divs
        let div = document.createElement("div")

        // Create the elements
        let header = document.createElement("h2")
        header.href = project.link
        header.innerText = project.title
        div.appendChild(header)

        let image = document.createElement("img")
        image.src = project.image

        let imagelink = document.createElement("a")
        imagelink.href = project.link
        imagelink.appendChild(image)
        div.appendChild(imagelink)

        let description = document.createElement("p")
        description.innerHTML = `<span></span>${project.description}`
        div.appendChild(description)

        let link = document.createElement("a")
        link.href = project.link
        link.innerText = "Learn More"
        div.appendChild(link)

        projectdiv.appendChild(div)
    }

    searchbar.addEventListener('input', function() {
        const search = searchbar.value.toLowerCase()
        let count = 0
        
        for (const project of projectdiv.children) {
            if (project.getElementsByTagName("h2")[0].innerText.toLowerCase().includes(search)
             || project.getElementsByTagName("p" )[0].innerText.toLowerCase().includes(search)) {
                project.style.display = "block"
                count += 1
            } else {
                project.style.display = "none"
            }
        }
        badsearch.style.display = (count == 0 ? "block" : "none")
    })
})
