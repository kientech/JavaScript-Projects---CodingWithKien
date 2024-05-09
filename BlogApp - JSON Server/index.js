document.addEventListener("DOMContentLoaded", () => {
    var blogContainer = document.getElementById("blogs-list");

    fetch("http://localhost:3000/blogs")
    .then((response) => response.json)
    .then((data) => {
        data.forEach((blog) => {
            var blogLink = document.createElement("a");
            blogLink.href = "detail.html?slug="+ blog.slug;
            blogLink.textContent = blog.title;

            blogContainer.appendChild(blogLink);
        })
    })
    .catch((error) => console.log("Error", error))
})