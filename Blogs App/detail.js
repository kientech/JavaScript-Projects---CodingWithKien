document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var slug = urlParams.get("slug");
    
    fetch("http://localhost:3000/articles?slug=" + slug)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                var article = data[0];

                document.getElementById("title").value = article.title;
                document.getElementById("content").innerHTML = article.description;
                document.getElementById("author").value = article.author;
                document.getElementById("categories").value = article.categories.join(', ');
            } else {
                console.error("Article not found");
            }
        })
        .catch(error => console.error("Error fetching data:", error));
});
