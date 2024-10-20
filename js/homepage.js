document.addEventListener("DOMContentLoaded", function () {
    const productDataUrl = "../searchdata.json";

    const hideAllProducts = () => {
        const product = document.querySelectorAll(".product");
        product.forEach(item => {
            item.style.display = "none";
        });
    };

    const displayProducts = (products) => {
        const productList = document.getElementById("product-list");

        productList.innerHTML = "";

        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            const img = document.createElement("img");
            img.src = product.imageUrl;
            img.alt = product.name;
            productDiv.appendChild(img);

            const pDetails = document.createElement("div");
            pDetails.classList.add("p-details");

            const h4 = document.createElement("h4");
            h4.textContent = product.name;
            pDetails.appendChild(h4);
            const reviewDiv = document.createElement("div");
            reviewDiv.classList.add("review");

            const reviewStars = parseInt(product.review, 10);
            for (let i = 0; i < 5; i++) {
                const star = document.createElement("span");
                star.classList.add("star");
                if (i < reviewStars) {
                    star.textContent = "★"; // Filled star
                } else {
                    star.textContent = "☆"; // Empty star
                }
                reviewDiv.appendChild(star);
            }

            pDetails.appendChild(reviewDiv);

            productDiv.appendChild(pDetails);

            productList.appendChild(productDiv);
        });
    };

    const search = () => {
        const searchbox = document.getElementById("search-item").value.trim().toUpperCase();

        if (!searchbox) {
            hideAllProducts();
            return;
        }
        fetch(productDataUrl)
            .then(response => response.json())
            .then(products => {
                const filteredProducts = products.filter(product =>
                    product.name.toUpperCase().includes(searchbox)
                );

                // Display filtered products
                displayProducts(filteredProducts);
            })
            .catch(error => console.error("Error fetching products:", error));
    };

    hideAllProducts();

    document.getElementById("search-item").addEventListener("keyup", search);
});
