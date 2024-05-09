document.addEventListener("DOMContentLoaded", function () {
  const productsContainer = document.getElementById("products");

  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((products) => {
      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
                <div class='product-item'>
                    <img src=${product.image} alt=${product.name}>
                    <h1>${product.name}</h1>
                    <p>${product.price}</p>
                    <button onclick="addToCart(${product.id})" ${
          product.isCart ? "disabled" : ""
        }>Add to cart</button>
                </div>
            `;
        productsContainer.appendChild(productElement);
      });
    });
});
