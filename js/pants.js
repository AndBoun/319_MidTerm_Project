function addToPants(items) {
  let mainContainer = document.getElementById("pantsList");

  if (!mainContainer) {
    console.error("Element with id 'pantsList' not found.");
    return;
  }

  console.log("Adding to pants page");

  items.forEach(element => {
    let div = document.createElement("div");
    div.classList.add("col-md-6", "col-lg-4", "mb-4");
    div.innerHTML = `
            <div class="swiper-slide">
        <div class="product-item image-zoom-effect link-effect">
        <div class="image-holder position-relative">
          <a href="pants.html">
            <img src="${element.image}" alt="${element.attribute}" class="product-image img-fluid">
          </a>
          <a href="pants.html" class="btn-icon btn-wishlist">
            <svg width="24" height="24" viewBox="0 0 24 24">
            <use xlink:href="#heart"></use>
            </svg>
          </a>
        </div>
        <div class="product-content">
          <h5 class="element-title text-uppercase fs-5 mt-3">
            <a href="pants.html">${element.item}</a>
          </h5>
          <p>${element.productDescription}</p>
          <a href="#" class="text-decoration-none" data-after="Add to cart">
            <span>$${element.price}</span>
          </a>
        </div>
        </div>
      </div>`;
    mainContainer.appendChild(div);
  });
}

function setMainText(item) {
  let mainContainer = document.getElementById("title-container");
  let h4 = document.createElement("h4");
  h4.classList.add("text-uppercase");
  h4.innerHTML = `
    <h4 class="text-uppercase">${item}</h4>
    `
  mainContainer.appendChild(h4);
}


async function beginSetUp() {
  let data = await fetchUser();
  addToPants(data.PantsPageShop);
  setMainText(data.mainTitle);
}

function fetchUser() {
  return new Promise((resolve, reject) => {
    fetch("pantsData.json")
      // fetch("https://raw.githubusercontent.com/andboun/319_MidTerm_Project/main/pantsData.json")
      .then(response => {
        if (!response.ok) {
          reject(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => { resolve(data) })
      .catch((error) => { console.log(error) });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event fired");
  beginSetUp();
});