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

    // Load all projects dynamically
    for (const project of projects) {
        // Create the divs
        let div = document.createElement("div")
        div.className = "m-5 py-4 px-2 bg-zinc-800 rounded-xl transition transition-duration-100 hover:bg-gray-800"

        // Create the elements
        let header = document.createElement("h1")
        header.href = project.link
        header.innerText = project.title
        header.className = "mt-3 ml-3 text-heading text-3xl font-bold text-zinc-50"
        div.appendChild(header)

        let image = document.createElement("img")
        image.src = project.image
        image.className = "p-5 rounded-4xl"
        div.appendChild(image)

        let description = document.createElement("p")
        description.innerHTML = `<span style="margin-left:20px"></span>${project.description}`
        description.className = "mx-3 text-body text-zinc-50"
        div.appendChild(description)

        let link = document.createElement("a")
        link.href = project.link
        link.innerText = "Learn More"
        link.className = "mx-3 my-3 font-medium text-sky-400 hover:underline"
        div.appendChild(link)

        projectdiv.appendChild(div)
    }
})
