function addToOuterWear(items) {
  let mainContainer = document.getElementById("outerwearList");

  if (!mainContainer) {
    console.error("Element with id 'outerwearList' not found.");
    return;
  }

  console.log("Adding to outerwear page");

  mainContainer.innerHTML = "";

  items.forEach(element => {
    let div = document.createElement("div");
    div.classList.add("col-md-6", "col-lg-4", "mb-4");

    div.innerHTML = `
      <div class="swiper-slide">
        <div class="product-item image-zoom-effect link-effect">
        <div class="image-holder position-relative">
          <a href="index.html">
            <img src="${element.image}" alt="${element.description}" class="product-image img-fluid">
          </a>
          <a href="index.html" class="btn-icon btn-wishlist">
            <svg width="24" height="24" viewBox="0 0 24 24">
            <use xlink:href="#heart"></use>
            </svg>
          </a>
        </div>
        <div class="product-content">
          <h5 class="element-title text-uppercase fs-5 mt-3">
            <a href="index.html">${element.item}</a>
          </h5>
          <a href="#" class="text-decoration-none" data-after="Add to cart">
            <span>$${element.price}</span>
          </a>
        </div>
        </div>
      </div>`;

    mainContainer.appendChild(div);
  });
}

async function beginSetUp() {
  try {
    let data = await fetchUser();
    if (data && data.OuterwearPageShop) {
      addToOuterWear(data.OuterwearPageShop);
    } else {
      console.error("Data or OuterwearPageShop not found in the response.");
    }
  } catch (error) {
    console.error("Error during setup:", error);
  }
}

function fetchUser() {
  return new Promise((resolve, reject) => {
    fetch("../outerwearData.json")
    // fetch("https://raw.githubusercontent.com/andboun/319_MidTerm_Project/main/outerwearData.json")
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

// Execute the setup when DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  beginSetUp();
});
