
let products = [];
const productGrid = document.getElementById("productGrid");
const sortSelect = document.getElementById("sortOptions");
const pagination = document.getElementById("pagination");

let currentPage = 1;
const itemsPerPage = 10;

// Get JSON path from script tag
const scriptTag = document.currentScript;
const jsonPath = scriptTag.getAttribute("data-json");

// Default fallback if not found
const defaultPath = "../../data/best_selling.json";

// Fetch the products from the correct JSON file
async function fetchProducts() {
  const response = await fetch(jsonPath || defaultPath);
  products = await response.json();
  paginateAndRender(getSortedProducts());
}



function renderProducts(productsToRender) {
  productGrid.innerHTML = "";
  productsToRender.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <a href="product.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-info">
          <p class="product-name">${product.name}</p>
          <p class="product-price">₹${product.price}</p>
        </div>
      </a>
    `;
    productGrid.appendChild(card);
  });
}

function paginateAndRender(sortedProducts) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = sortedProducts.slice(start, end);
  renderProducts(paginatedItems);
  renderPagination(sortedProducts.length);
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  pagination.innerHTML = `
    <button ${currentPage === 1 ? "disabled" : ""} onclick="changePage(-1)">&lt;</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button ${currentPage === totalPages ? "disabled" : ""} onclick="changePage(1)">&gt;</button>
  `;
}

function changePage(delta) {
  currentPage += delta;
  paginateAndRender(getSortedProducts());
}

function getSortedProducts() {
  const sortBy = sortSelect.value;
  return [...products].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    if (sortBy === "new") return new Date(b.date) - new Date(a.date);
    return 0;
  });
}

sortSelect.addEventListener("change", () => {
  currentPage = 1;
  paginateAndRender(getSortedProducts());
});

fetchProducts(); // Call the async function to load data



const quotes = [
    "Elegance is when the inside is as beautiful as the outside. ",
    "Jewelry is like the perfect spice — it complements what's already there.",
    "Bangles that speak louder than words.",
    "Style is a way to say who you are without speaking.",
    "Grace isn't just worn — it's embraced.",
    "Every sparkle tells a story. Make it yours."
  ];

  window.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.getElementById("quoteText");
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = randomQuote;
  });
