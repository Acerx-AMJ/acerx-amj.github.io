// Too lazy to use JSON
var projects = [
    {
        title: "Sandbox-2D",
        description: "Build whatever your heart desires, survive the environment or simply play around - it's up to you. Sandbox-2D is a sandbox survival game where you can build, destroy and explore.",
        image: "../assets/sandbox2d_12.png",
        link: "../projects/sandbox2d.html",
    }
];
document.addEventListener("DOMContentLoaded", function () {
    var projectdiv = document.getElementById("projects");
    // Load all projects dynamically
    for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
        var project = projects_1[_i];
        var div = document.createElement("div");
        div.className = "project";
        var link = document.createElement("a");
        link.href = project.link;
        link.innerText = project.title;
        div.appendChild(link);
        var description = document.createElement("p");
        description.innerText = project.description;
        div.appendChild(description);
        var image = document.createElement("img");
        image.src = project.image;
        div.appendChild(image);
        projectdiv.appendChild(div);
    }
});
