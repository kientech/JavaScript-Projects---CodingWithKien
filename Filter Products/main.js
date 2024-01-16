// Sample product data with color and size information
const products = [
    { name: 'Laptop', category: 'electronics', price: 800 },
    { name: 'Red T-shirt (Small)', category: 'clothing', price: 20, color: 'red', size: 'small' },
    { name: 'Blue T-shirt (Medium)', category: 'clothing', price: 25, color: 'blue', size: 'medium' },
    // Add more product data as needed
];

// Function to display products based on filters
function displayProducts(filteredProducts) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `<h3>${product.name}</h3>
                                <p>Category: ${product.category}</p>
                                <p>Price: $${product.price}</p>
                                <p>Color: ${product.color || 'N/A'}</p>
                                <p>Size: ${product.size || 'N/A'}</p>`;
        productList.appendChild(productItem);
    });
}

// Function to filter products based on category, price, color, and size
function filterProducts() {
    console.log("filtering ...");
    const selectedCategory = document.getElementById('category').value;
    const redChecked = document.getElementById('red').checked;
    const blueChecked = document.getElementById('blue').checked;
    // Add more color checkboxes as needed

    const smallChecked = document.getElementById('small').checked;
    const mediumChecked = document.getElementById('medium').checked;
    const largeChecked = document.getElementById('large').checked;
    // Add more size checkboxes as needed

    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
        const colorMatch = (redChecked && product.color === 'red') || (blueChecked && product.color === 'blue');
        // Add more color checks as needed

        const sizeMatch = (smallChecked && product.size === 'small') || (mediumChecked && product.size === 'medium') || (largeChecked && product.size === 'large');
        // Add more size checks as needed

        const priceMatch = product.price >= minPrice && product.price <= maxPrice;

        return categoryMatch && colorMatch && sizeMatch && priceMatch;
    });
    displayProducts(filteredProducts);
}
displayProducts(products)