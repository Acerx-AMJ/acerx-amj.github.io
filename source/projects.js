// Too lazy to use JSON
var projects = [
    {
        title: "Sandbox-2D",
        hook: "Build whatever your heart desires, survive the environment or simply play around - it's up to you. Sandbox-2D is a sandbox survival game where you can build, destroy and explore.",
        description: "I made Sandbox-2D with C++ and Raylib and during the creation of this project I learned DoD and simplistic design. No other project has taught me as much as this one. I truly love making it and it'll forever stay in my memory. It also helped me hone my pixel art skills, as I needed to create the entirety of pixel art myself from the 8x8 blocks to the 256x144 backgrounds.",
        image: "../assets/sandbox2d.png",
    }
];
document.addEventListener("DOMContentLoaded", function () {
    var projectthumbnails = document.getElementById("project-thumbnails");
    var projectdiv = document.getElementById("projects");
    // Load all projects dynamically
    for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
        var project = projects_1[_i];
        // Create the thumbnail
        var thumbnaildiv = document.createElement("div");
        thumbnaildiv.className = "thumbnail";
        var thumbnailimage = document.createElement("img");
        thumbnailimage.src = project.image;
        thumbnaildiv.appendChild(thumbnailimage);
        // Create the project itself
        var div = document.createElement("div");
        div.className = "project";
        var title = document.createElement("h1");
        title.innerText = project.title;
        div.appendChild(title);
        var hook = document.createElement("p");
        hook.innerText = project.hook;
        div.appendChild(hook);
        var image = document.createElement("img");
        image.src = project.image;
        div.appendChild(image);
        var description = document.createElement("p");
        description.innerText = project.description;
        div.appendChild(description);
        projectthumbnails.appendChild(thumbnaildiv);
        projectdiv.appendChild(div);
    }
});
