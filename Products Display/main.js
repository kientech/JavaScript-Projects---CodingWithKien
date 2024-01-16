let products = [
    {
        name: "TOZO T6 True Wireless Earbuds Bluetooth Headphone",
        price: "$ 70",
        image: "./images/tozo.png"
    },
    {
        name: "Samsung Electronics Samsung Galexy S21 5G",
        price: "$ 2300",
        image: "./images/samsung.png"
    },
    {
        name: "Amazon Basics High-Speed HDMI Cable (18 Gbps)",
        price: "$ 360",
        image: "./images/amazone.png"
    },
    {
        name: "Portable Wshing Machine 11lbs capacity Model 18NMF",
        price: "$ 80",
        image: "./images/portable.png"
    },
    {
        name: "Wired Over-Ear Gaming Headphones with USB",
        price: "$ 1500",
        image: "./images/wireless.png"
    },
    {
        name: "Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod",
        price: "$ 1200",
        image: "./images/tv1.png"
    },
    {
        name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
        price: "$ 250",
        image: "./images/dell.png"
    },
    {
        name: "4K UHD LED Smart TV with Chromecast Built-in",
        price: "$ 220",
        image: "./images/4k_uhd.png"
    }
]

let container = document.getElementById('container')
for (let i = 0; i < products.length; i++){
    let div = document.createElement('div')
    div.classList.add('product')
    div.innerHTML = `
        <img class='product_img' src=${products[i].image} alt=${products[i].name}>
        <h1 class="product_name">${products[i].name}</h1>
        <p class="product_price">${products[i].price}</p>
    `
    container.appendChild(div)
}