const API_URL = "https://api.escuelajs.co/api/v1/products";

let products = [];
let filteredProducts = [];

let currentPage = 1;
let pageSize = 5;

/* ================= GET ALL ================= */
async function getAllProducts() {
  const res = await fetch(API_URL);
  products = await res.json();
  filteredProducts = [...products];
  render();
}

/* ================= RENDER ================= */
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
        <td><img src="${p.images[0]}" alt=""></td>
        <td>${p.title}</td>
        <td>$${p.price}</td>
        <td>${p.category?.name || ""}</td>
      </tr>
    `;
  });

  document.getElementById("pageInfo").innerText =
    `Trang ${currentPage} / ${Math.ceil(filteredProducts.length / pageSize)}`;
}

/* ================= SEARCH ================= */
document.getElementById("searchInput").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(keyword)
  );
  currentPage = 1;
  render();
});

/* ================= SORT ================= */
document.getElementById("sortSelect").addEventListener("change", (e) => {
  const value = e.target.value;

  if (value === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }
  if (value === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  if (value === "name-asc") {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (value === "name-desc") {
    filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  render();
});

/* ================= PAGE SIZE ================= */
document.getElementById("pageSize").addEventListener("change", (e) => {
  pageSize = Number(e.target.value);
  currentPage = 1;
  render();
});

/* ================= PAGINATION ================= */
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

/* ================= INIT ================= */
getAllProducts();
