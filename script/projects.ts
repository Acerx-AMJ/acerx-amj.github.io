interface Project {
   title: string
   description: string
   image: string
   link: string
}

// Too lazy to use JSON
const projects: Array<Project> = [
   {
      title: "Sandbox-2D",
      description: "Build whatever your heart desires, survive the environment or simply play around - it's up to you. Sandbox-2D is a sandbox survival game where you can build, destroy and explore.",
      image: "../assets/sandbox2d_12.png",
      link: "../projects/sandbox2d.html",
   }
]

document.addEventListener("DOMContentLoaded", () => {
   const projectdiv = document.getElementById("projects")

   // Load all projects dynamically
   for (const project of projects) {
      let div = document.createElement("div")
      div.className = "project"

      let link = document.createElement("a")
      link.href = project.link
      link.innerText = project.title
      div.appendChild(link);

      let description = document.createElement("p")
      description.innerText = project.description
      div.appendChild(description)

      let image = document.createElement("img")
      image.src = project.image
      div.appendChild(image)

      projectdiv.appendChild(div)
   }
})
