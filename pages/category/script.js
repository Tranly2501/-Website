// DOM
const listProduct = document.querySelector("#list");
const pagination = document.querySelector("#pagination");
// DOM elements for filters
const categorySelect = document.querySelector("#filterCategory");
const sortSelect = document.querySelector("#filterSort");

// Biến toàn cục
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let itemsPerPage = 6;
// Lấy dữ liệu từ file JSON
const getDataFromJson = async () => {
  try {
    const response = await fetch("/dataProduct.json");
    const data = await response.json();

    if (data && data.length > 0) {
      allProducts = [...data];      
      filteredProducts = [...allProducts]; 
      const firstPageData = paginate(allProducts, currentPage, itemsPerPage);
      render(firstPageData);
      renderPagination(allProducts);
    } else {
      listProduct.innerHTML = "<p>Không có sản phẩm nào</p>";
    }
  } catch (error) {
    console.error("Lỗi:", error);
  }
};
getDataFromJson();

//  lọc theo danh muc và sắp xếp theo giá 
categorySelect.addEventListener("change", loadData);
sortSelect.addEventListener("change",loadData);

function loadData(){
  //lọc theo danh mục 
const selectedCategory = categorySelect.value;
  currentPage = 1;
  if (selectedCategory === "all") {
    filteredProducts = allProducts; // Hiển thị tất cả sản phẩm
  }else {
    filteredProducts = allProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

//sắp xếp  theo giá 
const selectedSort = sortSelect.value;
  if (selectedSort === "giảm") {
    filteredProducts = filteredProducts.sort((a, b) => parsePrice(b.price) -parsePrice(a.price));
  } else if (selectedSort === "tăng") {
    filteredProducts =  filteredProducts.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  }

  //render lại trang 
  const dataPagination = filteredProducts.length ? filteredProducts :allProducts;
  const dataRender = paginate(dataPagination,currentPage,itemsPerPage);
  render(dataRender);
  renderPagination(dataPagination);
 return filteredProducts;
}

// xóa hết kí tự không phải là số
function parsePrice(value){
  return Number(value.replace(/[^\d]/g, "")); // /[^\d]/g sẽ tìm toàn bộ ký tự không phải số (chữ, khoảng trắng, dấu chấm, ký hiệu tiền tệ…).
}
    function formatVND(amount) {
      return amount.toLocaleString("vi-VN") + " ₫";
    }
// Hàm render sản phẩm
async function render(list) {
  listProduct.innerHTML = list.map(item => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100">
        <a href="/pages/detail/detailProduct.html?id=${item.id}">
          <img class="card-img-top object-fit-cover" style="height: 16rem;" 
               src="${item.imgUrl}" alt="${item.title}">
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
            <span class="fs-4 fw-bold text-navy ">${formatVND(item.price)}</span>
          </div>         
        </div>
      </div>
    </div>
  `).join("");
}



// hàm phân trang 
function paginate(items, page, itemsPerPage) {
  
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return items.slice(start, end);
}
// hàm hiện  thị lại phân trang sau khi lọc
function renderPagination(items) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  let pages = [];
  // ====== Nút Prev (luôn hiển thị) ======
  pages.push(`
    <button class="page-link ${currentPage === 1 ? 'disabled' : ''}" 
      ${currentPage === 1 ? 'disabled' : `onclick="changePage(${currentPage - 1})"`}>
      Trước
    </button>
  `);

  let start, end;
  if (totalPages <= 3) {
    // Nếu ≤ 3 trang thì hiển thị hết
    start = 1;
    end = totalPages;
  } else {
    // Luôn hiển thị đúng 3 trang
    if (currentPage === 1) {
      start = 1;
      end = 3;
    } else if (currentPage === totalPages) {
      start = totalPages - 2;
      end = totalPages;
    } else {
      start = currentPage - 1;
      end = currentPage + 1;
    }
  }
  for (let i = start; i <= end; i++) {
    pages.push(`
      <button 
        class="page-link ${i === currentPage ? 'active ' : ''}" 
        onclick="changePage(${i})">
        ${i}
      </button>
    `);
  }
  // ====== Nút Next (luôn hiển thị) ======
  pages.push(`
    <button class="page-link ${currentPage === totalPages ? 'disabled' : ''}" 
      ${currentPage === totalPages ? 'disabled' : `onclick="changePage(${currentPage + 1})"`}>
      Sau
    </button>
  `);
  pagination.innerHTML = pages.join('');
}
function changePage(page){
  currentPage = page;
  const paginatedData = paginate(filteredProducts.length ?filteredProducts : allProducts,currentPage,itemsPerPage);
  render(paginatedData);
  renderPagination(filteredProducts.length? filteredProducts : allProducts);
}


