document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("productList");

  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((products) => {
      products.forEach((product) => {
        renderProduct(product);
      });
    });
});

function renderProduct(product) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>
            <img src=${product.image} alt=${product.name} style="width: 100px;">
        </td>
        <td>${product.category}</td>
        <td>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        </td>
    `;
  productList.appendChild(tr);
}

function openAddProductModal() {
  const modal = document.getElementById("productModal");
  modal.style.display = "block";
  document.getElementById("modalTitle").textContent = "Add Product";
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productImage").value = "";
  document.getElementById("category").value = "";
  document.getElementById("productId").value = "";
}

function closeAddProductModal() {
  const modal = document.getElementById("productModal");
  modal.style.display = "none";
}

function saveProduct() {
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const image = document.getElementById("productImage").value;
  const category = document.getElementById("category").value;
  const productId = document.getElementById("productId").value;

  if (name && price && category && image) {
    const productData = {
      name: name,
      price: parseFloat(price),
      image: image,
      category: category,
    };

    if (productId) {
      fetch("http://localhost:3000/products/" + productId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }).then(() => location.reload());
    } else {
      fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }).then(() => location.reload());
    }
  }
}

function editProduct(productId) {
  fetch("http://localhost:3000/products/" + productId)
    .then((response) => response.json())
    .then((product) => {
      const modal = document.getElementById("productModal");
      modal.style.display = "block";

      document.getElementById("modalTitle").textContent = "Edit Product";
      document.getElementById("productName").value = product.name;
      document.getElementById("productPrice").value = product.price;
      document.getElementById("category").value = product.category;
      document.getElementById("productImage").value = product.image;
      document.getElementById("productId").value = product.id;
    });
}

function deleteProduct(productId) {
  if (confirm("Are you sure you want to delete this product?")) {
    fetch("http://localhost:3000/products/" + productId, {
      method: "DELETE",
    }).then(() => location.reload());
  }
}
