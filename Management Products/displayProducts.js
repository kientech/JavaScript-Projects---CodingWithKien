// Check if local storage is supported
if (typeof Storage !== "undefined") {
  // Local storage is supported

  // Retrieve stored products from local storage
  var storedProducts = JSON.parse(localStorage.getItem("products")) || [];

  // Filter out soft-deleted products
  var activeProducts = storedProducts.filter(function (product) {
    return !product.deleted;
  });

  // Display the product information in the HTML document
  var productList = document.getElementById("productList");

  if (activeProducts.length > 0) {
    activeProducts.forEach(function (product) {
      var listItem = document.createElement("div");
      listItem.classList.add("product");
      listItem.innerHTML = `
                <img src=${product.image} />
                <h1>${product.name}</h1>
                <p>${product.price} đ</p>
            `;
      productList.appendChild(listItem);
    });
  } else {
    productList.innerHTML += "<li>No active products available.</li>";
  }
} else {
  // Local storage is not supported
  alert("Sorry, your browser does not support local storage.");
}
