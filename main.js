document.addEventListener("DOMContentLoaded", () => {

  const API_URL = "https://api.escuelajs.co/api/v1/products";

  let products = [];
  let filteredProducts = [];
  let currentPage = 1;
  let pageSize = 5;

  async function getAllProducts() {
    const res = await fetch(API_URL);
    products = await res.json();
    filteredProducts = [...products];
    render();
  }

  function render() {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageData = filteredProducts.slice(start, end);

    const tbody = document.getElementById("productBody");
    tbody.innerHTML = "";

    pageData.forEach(p => {
      tbody.innerHTML += `
        <tr>
          <td>${p.id}</td>
          <td><img src="${p.images[0]}" width="80"></td>
          <td>${p.title}</td>
          <td>$${p.price}</td>
          <td>${p.category?.name || ""}</td>
        </tr>
      `;
    });

    document.getElementById("pageInfo").innerText =
      `Trang ${currentPage} / ${Math.ceil(filteredProducts.length / pageSize)}`;
  }

  document.getElementById("searchInput").addEventListener("input", e => {
    const key = e.target.value.toLowerCase();
    filteredProducts = products.filter(p =>
      p.title.toLowerCase().includes(key)
    );
    currentPage = 1;
    render();
  });

  document.getElementById("sortSelect").addEventListener("change", e => {
    const v = e.target.value;
    if (v === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
    if (v === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);
    if (v === "name-asc") filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    if (v === "name-desc") filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    render();
  });

  document.getElementById("pageSize").addEventListener("change", e => {
    pageSize = +e.target.value;
    currentPage = 1;
    render();
  });

  document.getElementById("prevBtn").onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      render();
    }
  };

  document.getElementById("nextBtn").onclick = () => {
    if (currentPage < Math.ceil(filteredProducts.length / pageSize)) {
      currentPage++;
      render();
    }
  };

  getAllProducts();
});
