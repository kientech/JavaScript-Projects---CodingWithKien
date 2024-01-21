document.addEventListener("DOMContentLoaded", function () {
  var articleListContainer = document.getElementById("article-list");

  fetch("http://localhost:3000/articles")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((article) => {
        var articleLink = document.createElement("a");
        articleLink.href = "detail.html?slug=" + article.slug;
        articleLink.textContent = article.title;
        articleListContainer.appendChild(articleLink);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
