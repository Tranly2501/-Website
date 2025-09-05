

//2. Phần truy cập đến link detail của từng sản phẩm 
const detailContain = document.getElementById("detail")
const dataProduct=[];

const getDetailBook = async () => {
    try {
    const url = new URLSearchParams(window.location.search);

    const bookId = url.get('id');

    const response = await fetch('/dataProduct.json');

    const data = await response.json();

    const findBookById = data.find(item => item.id === Number(bookId));
        
        detailContain.innerHTML = `
            <!-- Hình ảnh sản phẩm -->
        <div class="row -2 ">
                    <div class="col-lg-6">
                        <div class="mb-3 ">
                            <div class="card">
                                <img id="mainImage" src="${findBookById.imgUrl}" alt="${findBookById.title}" class="card-img-top rounded" style="aspect-ratio: 1; object-fit: cover;">
                            </div>
                        </div>
    
                        <div class="row gap-0  " >
                        ${findBookById.images.map( img => `
                            <div class="col-3 ">
                                <button class="btn p-0 w-100 border-0   item  ">
                                    <img src="${img}" class="w-100 rounded  " style="aspect-ratio: 1; object-fit: cover; ">
                                </button>
                            </div> ` ).join('')}
                        </div>
    
                        </div>
                        <!-- Thông tin sản phẩm  -->
                        <div class="col-lg-6">
                            <div class="card h-100">
                                <div class="card-body text-navy">
                                    <h1 class="h2 fw-bold mb-3 text-navy title">${findBookById.title}</h1>
    
                                   <!-- danh gia -->
                                    <div class="d-flex align-items-center mb-2">⭐⭐⭐⭐⭐</div>
    
                                    <!-- giá sản phẩm -->
                                    <div class="d-flex align-items-center mb-4">
                                     <span class="h2 fw-bold text-navy mb-0 title">${formatVND(findBookById.pricee)}</span>
                                    </div>
                                    <!-- Mô tả sản phẩm -->
                                     <div class="text-muted mb-4 title ">
                                        ${findBookById.description}
                                    </div>
                                    <!-- chất liệu  -->
                                         <div class="mb-4 text-navy title">
                                            <h5 class="fw-semibold mb-2">Chất liệu</h5>
                                            ${findBookById.material.map(material => `
                                                <span class="badge bg-light text-navy">${material}</span>
                                                `).join(' ')}
                                        </div>                                     
                                     <!-- kích cỡ -->
                                      <div class="mb-4"> 
                                        <h5 class="fw-semibold mb-2 title "> Kích cỡ </h5>
                                        <div class="row g-2 title" id="size">
                                            <div class="col-auto ">
                                                <button class="btn btn-size" >16cm</button>
                                            </div>
                                            <div class="col-auto">
                                                <button class="btn btn-size" >17cm</button>
                                            </div>
                                            <div class="col-auto">
                                                <button class="btn btn-size" >18cm</button>
                                            </div>
                                            <div class="col-auto">
                                                <button class="btn btn-size "  >19cm</button>
                                            </div>
                                        </div>
                                      </div>
    
                                      <!-- Số lượng -->
                                    <div class="mb-4">
                                        <h5 class="fw-semibold mb-2 title">Số lượng</h5>
                                        <div class="d-flex align-items-center">
                                            <button class="btn " id="decrease" style="border: 1px solid #626262;">-</button>
                                                <span class="mx-3 h5 mb-0" id="sl">1</span>
                                            <button class="btn  " id="increase" style="border: 1px solid #626262;">+</button>
                                        </div>
                                    </div>
                                    <!-- Hành động  -->
                                     <div class="d-grid  mx-2 my-4">
                                    <div class ="row " >
                                        <button class=" col-lg-5 btn me-5 border-secondary " id="cart_page" ">
                                            <i class="fas fa-shopping-bag me-2"></i>
                                           Thêm vào giỏ hàng 
                                        </button>
                                        
                                        <button class=" col-lg-5  btn btn-size " id = "Ar_pages">
                                            <i class="fas fa-heart me-2"></i>
                                            Trải nghiệm AR
                                        </button>
                                    </div>
                                     </div>
                                     <!-- chính sách -->
                                    <div class="border-top pt-4">
                                        <ul>
                                            <li class="mb-3" >
                                                Miễn phí vận chuyển cho đơn hàng trên 2.000.000VND
                                            </li>
                                            <li class="mb-3" >
                                                Bảo hành trọn đời
                                            </li>
                                            <li class="mb-3" >                                        
                                                Được hoàn trả trong 30 ngày tính từ ngày mua hàng 
                                            </li>
                                        </ul>
                                    </div>
                            </div>
                        </div> 
        </div>
                     
                                <!-- Product Details Tabs -->
            <div class="row mt-5">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <ul class="nav nav-tabs" id="productTabs" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab">
                                        Mô tả sản phẩm
                                    </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="specifications-tab" data-bs-toggle="tab" data-bs-target="#specifications" type="button" role="tab">
                                        Thông số sản phẩm 
                                    </button> 
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button" role="tab">
                                        Đánh giá
                                    </button>
                                </li>
                            </ul>
                            <div class="tab-content mt-4" id="productTabsContent">
                                <div class="tab-pane fade show active" id="description" role="tabpanel">
                                    <p>${findBookById.descP1}</p>
                                    <p>${findBookById.descP2}</p>
                                    <ul>
                                        <li>Handcrafted by master jewelers</li>
                                        <li>Conflict-free diamonds</li>
                                        <li>Hypoallergenic materials</li>
                                        <li>Professional cleaning recommended</li>
                                    </ul>
                                </div>
                                <div class="tab-pane fade" id="specifications" role="tabpanel">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td><strong>Material</strong></td>
                                                <td>18k White Gold</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Gemstone</strong></td>
                                                <td>Natural Diamonds</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Total Carat Weight</strong></td>
                                                <td>2.5 carats</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Diamond Cut</strong></td>
                                                <td>Round Brilliant</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Clarity</strong></td>
                                                <td>VS1-VS2</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Color</strong></td>
                                                <td>G-H</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Length Options</strong></td>
                                                <td>16cm, 17cm, 18cm, 19cm</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Weight</strong></td>
                                                <td>12.5 grams</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="reviews" role="tabpanel">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="text-center">
                                                <div class="display-4 fw-bold text-gold">4.9</div>
                                                <div class="d-flex justify-content-center mb-2">
                                                    <i class="fas fa-star star-rating"></i>
                                                    <i class="fas fa-star star-rating"></i>
                                                    <i class="fas fa-star star-rating"></i>
                                                    <i class="fas fa-star star-rating"></i>
                                                    <i class="fas fa-star star-rating"></i>
                                                </div>
                                                <p class="text-muted">Based on 127 reviews</p>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="mb-3">
                                               
                                                </div>
                                                <p class="text-muted mb-1">"Absolutely stunning! The quality is exceptional and it looks even better in person. Perfect for special occasions."</p>
                                                <small class="text-muted">Verified Purchase - 2 weeks ago</small>
                                            </div>
                                            <hr>
                                            <div class="mb-3">
                                                <div class="d-flex align-items-center mb-2">
                                                    
                                                </div>
                                                <p class="text-muted mb-1">"Beautiful craftsmanship and the diamonds sparkle brilliantly. Worth every penny!"</p>
                                                <small class="text-muted">Verified Purchase - 1 month ago</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    `;
        //thay đổi hình ảnh
        changeImage();

        // chọn size
        chooseSize();        
        // Xử lý tăng giảm số lượng
        changeQuantity();
        // chuyển hướng sang page ar 
        arPage();
        // add cart
        addCart();



} catch (error) {
    console.error("Lỗi khi lấy dữ liệu",error);
}
};
getDetailBook();

function changeImage(){
    //xử lí click ảnh nhỏ đổi ảnh lơn 
        const mainImage = document.getElementById("mainImage");
        const items = document.querySelectorAll(".item ");
        //duyệt từng phần tử trong danh sách items
        items.forEach( ( btn) => {
            btn.addEventListener("click", function () {
                //xoa class active
                items.forEach( Image => Image.classList.remove("active"));

                //Them active cho ảnh được click
                this.classList.add("active");

                //lấy src từ ảnh trong button 
                const newSrc = this.querySelector("img").src;

                //hiệu ứng mờ dần ảnh lớn
                mainImage.style.opacity = 0;
                setTimeout( () => {
                    mainImage.src = newSrc;
                    mainImage.style.opacity =1;
                },200);
            } );
        } );
};

    function formatVND(amount) {
      return amount.toLocaleString("vi-VN") + " ₫";
    }

function changeQuantity(){
    // Lấy các phần tử cần thiết
        const quantityDisplay = document.getElementById("sl");
        const increaseButton = document.getElementById("increase");
        const decreaseButton = document.getElementById("decrease");
        let quantity = 1;
        //tăng số lượng
        increaseButton.addEventListener("mousedown", () => {
            increaseButton.style.backgroundColor = "var(--primary-gold)";
            increaseButton.style.color = "var(--accent-silver) ";
            increaseButton.style.borderColor = "var(--primary-gold) ";
            // Tăng số lượng và cập nhật hiển thị
            quantity++;
            quantityDisplay.textContent = quantity;
        });
        increaseButton.addEventListener("mouseup", () => {
            increaseButton.style.backgroundColor = "";
            increaseButton.style.color = "";
            increaseButton.style.borderColor = "#626262";
        }); 
        //giảm số lượng
        // Giảm số lượng và cập nhật hiển thị
        decreaseButton.addEventListener("mousedown", () => {
            decreaseButton.style.backgroundColor = "var(--primary-gold)";
            decreaseButton.style.color = "var(--accent-silver) ";   
            decreaseButton.style.borderColor = " var(--primary-gold) ";
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        });
        decreaseButton.addEventListener("mouseup", () => {
            decreaseButton.style.backgroundColor = "";
            decreaseButton.style.color = "";
            decreaseButton.style.borderColor = " #626262";
        }); 
};

function chooseSize(){
    const sizeButtons = document.querySelectorAll(".btn-size");
        sizeButtons.forEach( (btn) => {
            console.log(btn);        
            btn.addEventListener("click", function () {
                //xoa class active
                sizeButtons.forEach( size => size.classList.remove("active"));
                //them class active cho nút được click
                this.classList.add("active");
            });
        });
}

function addCart() {
    const cartBtn = document.getElementById("cart_page");

    cartBtn.addEventListener("mousedown", () => {
        // đổi màu 
        cartBtn.style.backgroundColor = "var(--primary-gold)";
        cartBtn.style.color = "var(--accent-silver)";
        // xóa class bordẻ-secondary
        cartBtn.classList.remove("border-secondary");
        // tăng số lượng giỏ hàng
        callNumbers();
    });

    cartBtn.addEventListener("mouseup", () => {
        cartBtn.style.backgroundColor = "";
        cartBtn.style.color = "";
        cartBtn.classList.add("border-secondary");
    });
};
document.addEventListener("DOMContentLoaded", () => {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart-count").textContent = productNumbers;
  }
});   

function callNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers+1);
        document.querySelector(".cart span").textContent = productNumbers+1;
    } else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('a .cart span').textContent =1;
    }
}

function arPage(){
        const arPage =document.getElementById("Ar_pages");
        arPage.addEventListener("click", () =>{
            window.location.href = "/pages/ar_try/ar.html";

        });

};

