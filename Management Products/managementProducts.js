let editingIndex = -1;

function toggleImageInput() {
  var imageType = document.getElementById("imageType").value;
  var uploadInput = document.getElementById("imageUpload");
  var linkLabel = document.getElementById("imageLinkLabel");
  var linkInput = document.getElementById("imageLink");

  if (imageType === "upload") {
    uploadInput.style.display = "block";
    linkLabel.style.display = "none";
    linkInput.style.display = "none";
  } else {
    uploadInput.style.display = "none";
    linkLabel.style.display = "block";
    linkInput.style.display = "block";
  }
}

function toggleEditImageInput() {
  var imageType = document.getElementById("editImageType").value;
  var uploadInput = document.getElementById("editImageUpload");
  var linkLabel = document.getElementById("editImageLinkLabel");
  var linkInput = document.getElementById("editImageLink");

  if (imageType === "upload") {
    uploadInput.style.display = "block";
    linkLabel.style.display = "none";
    linkInput.style.display = "none";
  } else {
    uploadInput.style.display = "none";
    linkLabel.style.display = "block";
    linkInput.style.display = "block";
  }
}

function addProduct() {
  var productName = document.getElementById("productName").value;
  console.log(productName);
  var productPrice = document.getElementById("productPrice").value;

  var imageType = document.getElementById("imageType").value;
  var imagePath = "";

  if (imageType === "upload") {
    var imageUpload = document.getElementById("imageUpload");
    var file = imageUpload.files[0];

    if (file) {
      // Create a FileReader to read the image as data URL
      var reader = new FileReader();
      reader.onload = function (e) {
        imagePath = e.target.result;
        saveProduct(productName, productPrice, imagePath);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image file for upload.");
    }
  } else {
    // Use the provided image link
    imagePath = document.getElementById("imageLink").value;
    saveProduct(productName, productPrice, imagePath);
  }
}

function saveProduct(name, price, image) {
  if (typeof Storage !== "undefined") {
    var storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    let infoProduct = {
      name: name,
      price: price,
      image: image,
      deleted: false,
    };

    storedProducts.push(infoProduct);
    localStorage.setItem("products", JSON.stringify(storedProducts));

    // Clear the form inputs
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("imageUpload").value = "";
    document.getElementById("imageLink").value = "";

    alert("Product added successfully!");
    window.location.href = "./management.html"; // Redirect back to the management page
  } else {
    alert("Sorry, your browser does not support local storage.");
  }
}

function editProduct(index) {
  editingIndex = index;

  var storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  var product = storedProducts[index];

  document.getElementById("editProductName").value = product.name;
  document.getElementById("editProductPrice").value = product.price;

  // Set the correct value based on the image type
  var editImageType = document.getElementById("editImageType");
  var editImageUpload = document.getElementById("editImageUpload");
  var editImageLink = document.getElementById("editImageLink");

  if (product.image.startsWith("data:")) {
    // Image is uploaded
    editImageType.value = "upload";
    editImageUpload.style.display = "block";
    editImageLinkLabel.style.display = "none";
    editImageLink.style.display = "none";
  } else {
    // Image is a link
    editImageType.value = "link";
    editImageUpload.style.display = "none";
    editImageLinkLabel.style.display = "block";
    editImageLink.style.display = "block";
  }

  editImageLink.value = product.image;

  var editModal = document.getElementById("editModal");
  editModal.style.display = "block";
}

function closeEditModal() {
  var editModal = document.getElementById("editModal");
  editModal.style.display = "none";
}

function saveChanges() {
  var updatedName = document.getElementById("editProductName").value;
  var updatedPrice = document.getElementById("editProductPrice").value;

  // Get the correct image path based on the image type
  var editImageType = document.getElementById("editImageType").value;
  var updatedImage = "";

  if (editImageType === "upload") {
    var editImageUpload = document.getElementById("editImageUpload");
    var file = editImageUpload.files[0];

    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        updatedImage = e.target.result;
        updateProduct(updatedName, updatedPrice, updatedImage);

        // Reload the page after updating the product
        location.reload();
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image file for upload.");
    }
  } else {
    updatedImage = document.getElementById("editImageLink").value;
    updateProduct(updatedName, updatedPrice, updatedImage);

    // Reload the page after updating the product
    location.reload();
  }
  location.reload();
}

function updateProduct(updatedName, updatedPrice, updatedImage) {
  var storedProducts = JSON.parse(localStorage.getItem("products")) || [];

  if (editingIndex !== -1 && editingIndex < storedProducts.length) {
    storedProducts[editingIndex] = {
      name: updatedName,
      price: updatedPrice,
      image: updatedImage,
      deleted: false, // Reset the deleted property on edit
    };

    localStorage.setItem("products", JSON.stringify(storedProducts));
    closeEditModal();
    editingIndex = -1;
    displayProducts();
  } else {
    alert("Error: Unable to update product. Please try again.");
  }
  location.reload();
}

function deleteProduct(index, isSoftDeleted) {
  var storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  var product = storedProducts[index];

  var confirmMessage = isSoftDeleted
    ? "Are you sure you want to permanently delete this product?"
    : "Are you sure you want to soft-delete this product?";

  var confirmDelete = confirm(confirmMessage);
  if (confirmDelete) {
    if (isSoftDeleted) {
      storedProducts.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(storedProducts));
      displayProducts();
    } else {
      softDeleteProduct(index);
    }
  }
  window.location.href = "./recycleBin.html";
}

function softDeleteProduct(index) {
  var storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  storedProducts[index].deleted = true;
  localStorage.setItem("products", JSON.stringify(storedProducts));
  displayProducts();
}

function restoreProduct(index) {
  var storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  storedProducts[index].deleted = false;
  localStorage.setItem("products", JSON.stringify(storedProducts));
  displayProducts();
}

function resetForm() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("imagePath").value = "";
}

function toggleImageInput() {
  var imageType = document.getElementById("imageType").value;
  var uploadInput = document.getElementById("imageUpload");
  var linkLabel = document.getElementById("imageLinkLabel");
  var linkInput = document.getElementById("imageLink");

  if (imageType === "upload") {
    uploadInput.style.display = "block";
    linkLabel.style.display = "none";
    linkInput.style.display = "none";
  } else {
    uploadInput.style.display = "none";
    linkLabel.style.display = "block";
    linkInput.style.display = "block";
  }
}

function addProduct() {
  var productName = document.getElementById("productName").value;
  var productPrice = document.getElementById("productPrice").value;

  var imageType = document.getElementById("imageType").value;
  var imagePath = "";

  if (imageType === "upload") {
    var imageUpload = document.getElementById("imageUpload");
    var file = imageUpload.files[0];

    if (file) {
      // Create a FileReader to read the image as data URL
      var reader = new FileReader();
      reader.onload = function (e) {
        imagePath = e.target.result;
        saveProduct(productName, productPrice, imagePath);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image file for upload.");
    }
  } else {
    // Use the provided image link
    imagePath = document.getElementById("imageLink").value;
    saveProduct(productName, productPrice, imagePath);
  }
  window.location.href = "./managementProducts.html";
}

function saveProduct(name, price, image) {
  if (typeof Storage !== "undefined") {
    var storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    let infoProduct = {
      name: name,
      price: price,
      image: image,
      deleted: false,
    };

    storedProducts.push(infoProduct);
    localStorage.setItem("products", JSON.stringify(storedProducts));

    // Clear the form inputs
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("imageUpload").value = "";
    document.getElementById("imageLink").value = "";

    alert("Product added successfully!");
  } else {
    alert("Sorry, your browser does not support local storage.");
  }
}

toggleImageInput(); // Call the function once to set the initial display state
