// http://localhost:3000/products

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("add-product-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const image = document.getElementById("productImage").value;
    const category = document.getElementById("category").value;

    const newProduct = {
      name: name,
      price: parseFloat(price), // convert string to float
      image: image,
      category: category,
    };

    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("New product added successfully!");
      })
      .catch((error) => {
        console.error("Error: ", error);
        alert("An error occurred while adding the product!");
      });
  });
});
