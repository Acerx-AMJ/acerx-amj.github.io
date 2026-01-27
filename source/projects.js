// Too lazy to use JSON
const projects = [{
    title: "Sandbox-2D",
    description: "Build whatever your heart desires, survive the environment or simply play around - it's up to you. Sandbox-2D is a sandbox survival game where you can build, destroy and explore.",
    image: "../assets/sandbox2d_12.png",
    link: "../projects/sandbox2d.html",
}, {
    title: "Block Placer",
    description: "Game heavily inspired by Tetris. Go solo, co-op or battle against a friend!",
    image: "../assets/block_placer_4.png",
    link: "../projects/block_placer.html",
}]

document.addEventListener("DOMContentLoaded", () => {
    const projectdiv = document.getElementById("projects")

    // Load all projects dynamically
    for (const project of projects) {
        // Create the divs
        let div = document.createElement("div")
        div.className = "m-5 py-4 px-2 bg-zinc-800 rounded-xl flex flex-row items-center justify-center"

        let leftdiv = document.createElement("div")
        leftdiv.className = "w-1/3 h-full bg-zinc-700 rounded-xl mx-2"
        div.appendChild(leftdiv)

        let rightdiv = document.createElement("div")
        rightdiv.className = "w-2/3 h-full bg-zinc-700 rounded-xl mx-2 flex items-center justify-center"
        div.appendChild(rightdiv)

        // Create the elements
        let header = document.createElement("h1")
        header.href = project.link
        header.innerText = project.title
        header.className = "m-5 text-heading text-3xl font-bold text-zinc-50"
        leftdiv.appendChild(header)

        let description = document.createElement("p")
        description.innerHTML = `<span style="margin-left:20px"></span>${project.description}`
        description.className = "mx-3 text-body text-zinc-50"
        leftdiv.appendChild(description)

        let image = document.createElement("img")
        image.src = project.image
        image.className = "p-5 rounded-4xl"
        rightdiv.appendChild(image)

        let link = document.createElement("a")
        link.href = project.link
        link.innerText = "Learn More"
        link.className = "mx-3 my-3 font-medium text-sky-400 hover:underline"
        leftdiv.appendChild(link)

        projectdiv.appendChild(div)
    }
})
