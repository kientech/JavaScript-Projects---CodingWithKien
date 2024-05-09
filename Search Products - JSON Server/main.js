document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const searchResults = document.getElementById("searchResults");
    const noResultMessage = document.getElementById("noResultMessage");

    fetch("http://localhost:3000/data")
    .then((response) => response.json())
    .then((data) => displayResults(data))
    .catch((error) => console.log("Error: ", error));

    searchButton.addEventListener('click', function () {
        const query = searchInput.value.toLowerCase();

        fetch(`http://localhost:3000/data?name_like=${query}`)
        .then((respone) => respone.json())
        .then((data) => displayResults(data))
        .catch((error) => console.log("Error: ", error));
    });

    function displayResults(results) {
        searchResults.innerHTML = "";
        noResultMessage.innerHTML = "";

        if(results.length == 0){
            noResultMessage.textContent = "No Products Found!"
        } else {
            results.forEach((product) => {
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");

                productCard.innerHTML = `
                    <img src=${product.image} alt=${product.name}>
                    <h1>${product.name}</h1>
                    <p>${product.price}</p>
                `
                searchResults.appendChild(productCard);
            })
        }
    }
})