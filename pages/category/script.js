// 1. DOM cache
const listProduct     = document.querySelector("#list");
const pagination      = document.querySelector("#pagination");
const categorySelect  = document.querySelector("#filterCategory");
const sortSelect      = document.querySelector("#filterSort");

// 2. Biến toàn cục
let allProducts      = [];
let filteredProducts = [];
let currentPage      = 1;
const itemsPerPage   = 6;
let totalPages       = 1;

// 3. Khởi chạy app
;(async function init() {
  await fetchData();
  bindEvents();
  render();  
})();

// 4. Fetch data
async function fetchData() {
  try {
    const res  = await fetch("/dataProduct.json");
    allProducts = await res.json();
  } catch (err) {
    console.error("Lỗi khi tải dữ liệu:", err);
    allProducts = [];
  }
}

// 5. Gắn sự kiện cho bộ lọc và phân trang
function bindEvents() {
  categorySelect.addEventListener("change", onFilterChange);
  sortSelect.addEventListener("change", onFilterChange);

  // Delegate event cho nút Prev/Next/Pages
  pagination.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const action = btn.dataset.action;
    const page   = Number(btn.dataset.page);

    if (action === "prev" && currentPage > 1) {
      currentPage--;
    } else if (action === "next" && currentPage < totalPages) {
      currentPage++;
    } else if (!isNaN(page)) {
      currentPage = page;
    }
    render();
  });
}

// 6. Khi filter thay đổi
function onFilterChange() {
  currentPage = 1;
  render();
}

// 7. Áp dụng filter + sort vào allProducts
function applyFilters() {
  const category = categorySelect.value;
  const sort = sortSelect.value;

  // 7.1 filter category
  filteredProducts = category === "all"
    ? [...allProducts]
    : allProducts.filter(p => p.category === category);

  // 7.2 sort (ví dụ: giá tăng/giảm)
  if (sort === "tăng") {
    filteredProducts.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
      const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
      return priceA - priceB; });
  } else if (sort === "giảm") {
    filteredProducts.sort((a, b) =>{ const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
      const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
      return priceB - priceA; });
  }

  // 7.3 tính lại tổng số trang
  totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
}

// 8. Render tổng thể
function render() {
  applyFilters();
  renderProducts();
  renderPagination();
}

// 9. Vẽ danh sách sản phẩm
function renderProducts() {
  const start = (currentPage - 1) * itemsPerPage;
  const end   = start + itemsPerPage;
  const slice = filteredProducts.slice(start, end);

  if (slice.length === 0) {
    listProduct.innerHTML = `<p class="text-center">Không có sản phẩm phù hợp</p>`;
    return;
  }

  listProduct.innerHTML = slice.map(item => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100">
        <a href="/pages/detail/detailProduct.html?id=${item.id}">
          <img class="card-img-top object-fit-cover" style="height:16rem;"
               src="${item.imgUrl}" alt="${item.title}">
        </a>
        <div class="card-body d-flex flex-column">
          <a class="card-title text-navy mb-2 text-decoration-none font-serif fs-4"
             href="/pages/detail/detailProduct.html?id=${item.id}">
            ${item.title}
          </a>
          <div class="mb-2">⭐⭐⭐⭐⭐</div>
          <p class="fs-6 text-secondary mb-3 text-truncate clamp-2 text-wrap">
            ${item.description}
          </p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <span class="fs-4 fw-bold text-navy">${item.price}</span>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// 10. Vẽ phân trang (Prev – [x,y,z] – Next)
function renderPagination() {
  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  const range = getPageRange();

  const html = [
    `<li class="page-item ${currentPage === 1 ? "disabled" : ""}">
       <button class="page-link" data-action="prev">Trước</button>
     </li>`,

    ...range.map(page => `
      <li class="page-item ${page === currentPage ? "active" : ""}">
        <button class="page-link" data-page="${page}">${page}</button>
      </li>
    `),

    `<li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
       <button class="page-link" data-action="next">Sau</button>
     </li>`
  ].join("");

  pagination.innerHTML = html;
}

// Tạo mảng số trang hiển thị (tối đa ±1 so với current)
function getPageRange() {
  const pages = [];
  let start = Math.max(1, currentPage - 1);
  let end   = Math.min(totalPages, currentPage + 1);

  if (currentPage === 1) end = Math.min(totalPages, 3);
  if (currentPage === totalPages) start = Math.max(1, totalPages - 2);

  for (let p = start; p <= end; p++) pages.push(p);
  return pages;
}