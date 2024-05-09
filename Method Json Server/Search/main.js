document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const searchResults = document.getElementById("searchResults");
  const noResultsMessage = document.getElementById("noResultsMessage");

  // Initial display of all products
  fetch("http://localhost:3000/data")
    .then((response) => response.json())
    .then((data) => displayResults(data))
    .catch((error) => console.error("Error:", error));

  searchButton.addEventListener("click", function () {
    const query = searchInput.value.toLowerCase();

    // Fetch data from JSON Server
    fetch(`http://localhost:3000/data?name_like=${query}`)
      .then((response) => response.json())
      .then((data) => displayResults(data))
      .catch((error) => console.error("Error:", error));
  });

  function displayResults(results) {
    searchResults.innerHTML = "";
    noResultsMessage.innerHTML = ""; // Clear previous no results message

    if (results.length === 0) {
      // Display a message when no results are found
      noResultsMessage.textContent = "No products found.";
    } else {
      results.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
          `;

        searchResults.appendChild(productCard);
      });
    }
  }
});
