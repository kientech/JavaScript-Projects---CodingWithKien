document.addEventListener("DOMContentLoaded", function () {
  const selectedTrash = new Set();
  const productForm = document.getElementById("productForm");
  const productNameInput = document.getElementById("productName");
  const productManageList = document.getElementById("productManageList");
  const productModal = document.getElementById("productModal");
  const modalTitle = document.getElementById("modalTitle");
  const openModalButton = document.getElementById("openModal");
  const closeModalButton = document.querySelector(".close");

  // Load products and trash on page load
  loadProducts();
  loadTrash();

  // Event listeners for modal
  openModalButton.addEventListener("click", openModal);
  closeModalButton.addEventListener("click", closeModal);
  window.addEventListener("click", outsideClick);

  // Display products on the page
  function displayProducts(products) {
    // Clear the product list before displaying
    productManageList.innerHTML = "";

    products.forEach(function (product) {
      const listItem = document.createElement("li");
      listItem.textContent = product.name;

      // Add edit and delete buttons
      const editButton = document.createElement("button");
      editButton.textContent = "Sửa";
      editButton.addEventListener("click", function () {
        openEditModal(product);
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Xoá";
      deleteButton.addEventListener("click", function () {
        moveProductToTrash(product);
      });

      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
      productManageList.appendChild(listItem);
    });
  }

  // Move product to trash
  function moveProductToTrash(product) {
    product.deleted = true;

    // Update the product on JSON Server
    fetch(`http://localhost:3000/products/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then(() => {
      loadProducts();
      loadTrash();
    });
  }

  // Open the modal for editing a product
  function openEditModal(product) {
    openModal();
    modalTitle.textContent = "Chỉnh Sửa Sản Phẩm";
    productNameInput.value = product.name;

    // Update the product on form submission
    productForm.addEventListener("submit", function (event) {
      event.preventDefault();
      product.name = productNameInput.value;

      // Update the product on JSON Server
      fetch(`http://localhost:3000/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }).then(() => {
        closeModal();
        // Reload products after update
        loadProducts();
      });
    });
  }

  // Load products from JSON Server
  function loadProducts() {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        displayProducts(data);
      });
  }

  // Load trashed products
  function loadTrash() {
    fetch("http://localhost:3000/products?deleted=true")
      .then((response) => response.json())
      .then((data) => {
        // Display trashed products in the trash list
        displayTrash(data);
      });
  }

  // Display trashed products on the page
  function displayTrash(trash) {
    const trashList = document.getElementById("trashList");
    trashList.innerHTML = "";

    trash.forEach(function (product) {
      const listItem = document.createElement("li");
      listItem.textContent = product.name;

      // Add checkbox for selecting multiple items
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("change", function () {
        toggleSelected(product.id, checkbox.checked);
      });
      listItem.appendChild(checkbox);

      trashList.appendChild(listItem);
    });
  }

  // Toggle selected state for multiple items
  function toggleSelected(productId, isChecked) {
    if (isChecked) {
      selectedTrash.add(productId);
    } else {
      selectedTrash.delete(productId);
    }
  }

  // Perform selected action on trash
  const performActionButton = document.getElementById("performAction");
  performActionButton.addEventListener("click", function () {
    performSelectedAction();
  });

  function performSelectedAction() {
    const actionSelect = document.getElementById("actionSelect");
    const selectedAction = actionSelect.value;

    selectedTrash.forEach((productId) => {
      if (selectedAction === "delete") {
        // Delete each selected trashed product permanently
        fetch(`http://localhost:3000/products/${productId}`, {
          method: "DELETE",
        });
      } else if (selectedAction === "restore") {
        // Restore each selected trashed product
        fetch(`http://localhost:3000/products/${productId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deleted: false }),
        });
      }
    });

    // Clear the selected items set
    selectedTrash.clear();

    // Reload the trash after performing the action
    loadTrash();
  }

  // Delete all trashed products
  const deleteAllTrashButton = document.getElementById("deleteAllTrash");
  deleteAllTrashButton.addEventListener("click", function () {
    deleteAllTrash();
  });

  function deleteAllTrash() {
    // Get all trashed products
    fetch("http://localhost:3000/products?deleted=true")
      .then((response) => response.json())
      .then((trash) => {
        // Delete each trashed product permanently
        trash.forEach((product) => {
          fetch(`http://localhost:3000/products/${product.id}`, {
            method: "DELETE",
          });
        });

        // Reload the trash after deleting all items
        loadTrash();
      });
  }

  // Add new product
  const addProductButton = document.getElementById("addProduct");
  addProductButton.addEventListener("click", function () {
    addNewProduct();
  });

  function addNewProduct() {
    openModal();
    modalTitle.textContent = "Thêm Sản Phẩm";

    // Update the product on form submission
    productForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const newProductName = productNameInput.value;

      // Add the new product to JSON Server
      fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newProductName, deleted: false }),
      }).then(() => {
        closeModal();
        loadProducts();
      });
    });
  }

  // Modal functions
  function openModal() {
    productModal.style.display = "block";
  }

  function closeModal() {
    productForm.reset();
    productModal.style.display = "none";
  }

  function outsideClick(event) {
    if (event.target === productModal) {
      closeModal();
    }
  }
});
