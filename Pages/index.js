const products = [
      { id: 1, name: "Bridal Bangle 1", price: 299, date: "2024-06-01", image: "../images/Bangles/P-1.jpg" },
      { id: 2, name: "Bridal Bangle 2", price: 499, date: "2024-05-15", image: "../images/Bangles/P-2.jpg" },
      { id: 3, name: "Bridal Bangle 3", price: 399, date: "2024-06-10", image: "../images/Bangles/P-3.jpg" },
      { id: 4, name: "Bridal Bangle 4", price: 199, date: "2024-04-20", image: "../images/Bangles/P-4.jpg" },
      { id: 5, name: "Bridal Bangle 5", price: 599, date: "2024-06-15", image: "../images/Bangles/P-5.jpg" },
      { id: 6, name: "Bridal Bangle 6", price: 349, date: "2024-05-28", image: "../images/Bangles/P-6.jpg" },
      { id: 7, name: "Bridal Bangle 7", price: 269, date: "2024-06-05", image: "../images/Bangles/P-7.jpg" },
      { id: 8, name: "Bridal Bangle 8", price: 489, date: "2024-06-03", image: "../images/Bangles/P-8.jpg" },
      { id: 9, name: "Bridal Bangle 9", price: 329, date: "2024-05-10", image: "../images/Bangles/P-9.jpg" },
      { id: 10, name: "Bridal Bangle 10", price: 449, date: "2024-05-01", image: "../images/Bangles/P-10.jpg" },
      { id: 11, name: "Bridal Bangle 11", price: 279, date: "2024-06-12", image: "../images/Bangles/P-11.jpg" },
      // Add more as needed
    ];

    const productGrid = document.getElementById("productGrid");
    const sortSelect = document.getElementById("sortOptions");
    const pagination = document.getElementById("pagination");

    let currentPage = 1;
    const itemsPerPage = 10;

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
      });
    }

    // Init
    sortSelect.addEventListener("change", () => {
      currentPage = 1;
      paginateAndRender(getSortedProducts());
    });

    // Initial render
    paginateAndRender(getSortedProducts());