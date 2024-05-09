document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cart");

  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((products) => {
      products.forEach((product) => {
        if (product.isCart) {
          const cartItemElement = document.createElement("div");
          cartItemElement.classList.add("product");
          cartItemElement.innerHTML = `
                        <div class='product-item'>
                            <img src=${product.image} alt=${product.name}>
                            <h1>${product.name}</h1>
                            <p>${product.price}</p>
                            <button onclick="removeFromCart(${product.id})"
                }>Remove</button>
                        </div>
                    `;
          cartContainer.appendChild(cartItemElement);
        }
      });
    });
});

function addToCart(productId) {
  fetch("http://localhost:3000/products/" + productId)
    .then((res) => res.json())
    .then((product) => {
      fetch("http://localhost:3000/products/" + productId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCart: true }),
      }).then(() => location.reload());
    });
}

function removeFromCart(productId) {
  fetch("http://localhost:3000/products/" + productId)
    .then((res) => res.json())
    .then((product) => {
      fetch("http://localhost:3000/products/" + productId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCart: false }),
      }).then(() => location.reload());
    });
}
