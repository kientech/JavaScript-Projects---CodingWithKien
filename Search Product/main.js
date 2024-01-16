const products = [
    {
        name: "BELL PEPPER",
        price: "$80.00",
        image: "./images/pepper.jpeg"
    },
    {
        name: "STRAWBERRY",
        price: "$120.00",
        image: "./images/strawberry.jpeg"
    },
    {
        name: "GREEN BEANS",
        price: "$120.00",
        image: "./images/green_beans.jpeg"
    },
    {
        name: "PURPLE CABBAGE",
        price: "$120.00",
        image: "./images/purple cabbage.jpeg"
    },
    {
        name: "TOMATOE",
        price: "$80.00",
        image: "./images/tomatoe.jpeg"
    },
    {
        name: "BROCOLLI",
        price: "$120.00",
        image: "./images/brocolli.jpeg"
    },
    {
        name: "CARROTS",
        price: "$120.00",
        image: "./images/carrots.jpeg"
    },
    {
        name: "FRUIT JUICE",
        price: "$120.00",
        image: "./images/fruit.jpeg"
    },
]

function displayProducts(productArray){
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    if (productArray.length === 0){
        const notFoundMessage = document.createElement('h1');
        notFoundMessage.classList.add("notFoundMessage");
        notFoundMessage.textContent = 'Not Found';
        productList.appendChild(notFoundMessage);
    } else {
        productArray.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            const productName = document.createElement('h1');
            productName.classList.add('productName');
            productName.textContent = product.name;

            const productPrice = document.createElement('p');
            productName.classList.add('productPrice');
            productPrice.textContent = product.price;

            const productImage = document.createElement('img');
            productImage.classList.add('productImage');
            productImage.src = product.image;
            productImage.alt = product.name;


            productDiv.appendChild(productImage);
            productDiv.appendChild(productName);
            productDiv.appendChild(productPrice);

            productList.appendChild(productDiv)
        })
    }
}

function searchProducts(){
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    const searchResult = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(searchResult);
}


displayProducts(products)
