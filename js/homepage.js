function addToBestSelling(items){
    let mainContainer = document.getElementById("bestSellersList");

    if (!mainContainer) {
        console.error("Element with id 'bestSellersList' not found.");
        return;
    }

    console.log("Adding to best selling");

   items.forEach(element => {
    let div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
            <div class="product-item image-zoom-effect link-effect">
              <div class="image-holder">
                <a href="homepage.html">
                  <img src="./${element.image}" alt="${element.description}" class="product-image img-fluid">
                </a>
                <a href="homepage.html" class="btn-icon btn-wishlist">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <use xlink:href="#heart"></use>
                  </svg>
                </a>
                <div class="product-content">
                  <h5 class="text-uppercase fs-5 mt-3">
                    <a href="homepage.html">${element.item}</a>
                  </h5>
                  <a href="homepage.html" class="text-decoration-none" data-after="Add to cart"><span>$${element.price}</span></a>
                </div>
              </div>
            </div>`;
    mainContainer.appendChild(div);
   });
}

function setMainPicture(item){
    let mainContainer = document.getElementById("main-background")
    let div = document.createElement("div");
    div.classList.add("video-image", "img-fluid");
    div.innerHTML = `
    <img src="${item.image}" alt="${item.description}" class="video-image img-fluid">
    `
    console.log(div.innerHTML)
    mainContainer.appendChild(div);
}


async function beginSetUp() {
    let data = await fetchUser();
    addToBestSelling(data.homePageBestSellingImages);
    setMainPicture(data.homePageMainImage);
}

function fetchUser() {
    return new Promise((resolve, reject) => {
        // fetch("data.json")
        fetch("https://raw.githubusercontent.com/andboun/319_MidTerm_Project/main/data.json")
        .then((response)=>{return response.json();})
        .then((data)=>{resolve(data)})
        .catch((error)=>{console.log(error)});
    });
}

document.addEventListener("DOMContentLoaded", function() {
    beginSetUp();
});