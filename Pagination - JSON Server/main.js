document.addEventListener("DOMContentLoaded", function (){
    const dataContainer = document.getElementById("data-container");
    const paginationContainer = document.getElementById("pagination-container");

    const itemsPerPage = 8;
    let currentPage = 1;

    function fetchData(){
        fetch(`http://localhost:3000/data?_page=${currentPage}&_limit=${itemsPerPage}`)
        .then((response) => response.json())
        .then((data) => {
            displayData(data)
            updatePagination();
        })
        .catch((error) => console.log("Error: ", error))
    }

    function displayData(data){
        dataContainer.innerHTML = "";
        data.forEach((item) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("products");
            itemElement.innerHTML = `
                <img src=${item.image}>
                <div class="content">
                    <h1 class="name-product">${item.name}</h1>
                    <h2 class="price">${item.price}</h2>
                </div>
            `
            dataContainer.appendChild(itemElement);
        })
    }

    function updatePagination(){
        fetch("http://localhost:3000/data")
        .then((response) => response.json())
        .then((data) => {
            const totalPages = Math.ceil(data.length / itemsPerPage);
            displayPagination(totalPages)
        })
        .catch((error) => console.log("Error: ", error))
    }

    function displayPagination(totalPages){
        paginationContainer.innerHTML = "";
        for(let i=1; i<=totalPages; i++){
            const pageLink = document.createElement("p");
            pageLink.textContent = i;

            if (i === currentPage) {
                pageLink.classList.add('active');
            }
            pageLink.addEventListener('click', () => {
                currentPage = i;
                fetchData();
            });
            paginationContainer.appendChild(pageLink);
        }
    }

    fetchData();
})