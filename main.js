const listProduct = document.querySelector("#list");
const pagination = document.querySelector("#pagination");

let allProducts = [];
let currentPage = 1;
const itemsPerPage = 6;
let totalPages = 1;

const getDataFromJson = async () => {
  try {
    const response = await fetch('/dataProduct.json');
    const data = await response.json();

    if (data && data.length > 0) {
      allProducts = data;
      totalPages = Math.ceil(allProducts.length / itemsPerPage);
      renderProducts(currentPage);
      renderPagination();
    } else {
      listProduct.innerHTML = "<p>Không có sản phẩm nào</p>";
    }
  } catch (error) {
    console.error("Lỗi:", error);
  }
};

function renderProducts(page) {
  listProduct.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageProducts = allProducts.slice(start, end);

  listProduct.innerHTML = pageProducts.map(item => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100">
        <a href="/pages/detail/detailProduct.html?id=${item.id}">
          <img class="card-img-top product-card object-fit-cover" 
               style="height: 16rem;" 
               src="${item.imgUrl}" 
               alt="${item.title}">
        </a>
        <div class="card-body">
          <a class="card-title text-navy mb-2 text-decoration-none font-serif fs-4" 
             href="/pages/detail/detailProduct.html?id=${item.id}">
             ${item.title}
          </a>
          <div class="d-flex align-items-center mb-2">⭐⭐⭐⭐⭐</div>
          <p class="fs-6 text-secondary mb-3 text-truncate clamp-2 text-wrap">
            ${item.description}
          </p>
          <div class="d-flex align-items-center justify-content-between">
            <span class="fs-4 fw-bold text-navy ">${item.price}</span>
          </div>         
        </div>
      </div>
    </div>
  `).join("");
}

function renderPagination() {
  pagination.innerHTML = "";

  // Nút "Trước"
  const prevLi = document.createElement("li");
  prevLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prevLi.innerHTML = `
    <button class="page-link rounded">Trước</button>`;
  prevLi.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts(currentPage);
      renderPagination();
    }
  });
  pagination.appendChild(prevLi);

  // Tính khoảng hiển thị 3 số
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);
  if (endPage - startPage < 2) {
    startPage = Math.max(1, endPage - 2);
  }

  for (let i = startPage; i <= endPage; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `
      <button class="page-link btn px-3 py-2 rounded fw-medium 
        ${i === currentPage ? "bg-warning text-white border-0" : "bg-white text-secondary border"}">
        ${i}
      </button>`;
    li.addEventListener("click", () => {
      currentPage = i;
      renderProducts(currentPage);
      renderPagination();
    });
    pagination.appendChild(li);
  }

  // Nút "Sau"
  const nextLi = document.createElement("li");
  nextLi.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
  nextLi.innerHTML = `<button class="page-link rounded">Sau</button>`;
  nextLi.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts(currentPage);
      renderPagination();
    }
  });
  pagination.appendChild(nextLi);
}

// Khởi chạy
getDataFromJson();
