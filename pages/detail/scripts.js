

//2. Phần truy cập đến link detail của từng sản phẩm 
const detailContain = document.getElementById("detail")
const dataProduct=[];

const getDetailBook = async () => {
    try {
    const url = new URLSearchParams(window.location.search);

    const bookId = url.get('id');

    const respone = await fetch('/dataProduct.json');

    const data = await respone.json();


    const findBookById = data.find(item => item.id === Number(bookId));
        
        detailContain.innerHTML = `
            <!-- Hình ảnh sản phẩm -->
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
                                 <span class="h2 fw-bold text-navy mb-0 title">${findBookById.price}</span>
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
                                            <button class="btn  btn-size" type="button" >16cm</button>
                                        </div>
                                        <div class="col-auto">
                                            <button class="btn  btn-size" type="button">17cm</button>
                                        </div>
                                        <div class="col-auto">
                                            <button class="btn  btn-size" type="button">18cm</button>
                                        </div>
                                        <div class="col-auto">
                                            <button class="btn  btn-size "  type="button">19cm</button>
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
                                    <button class=" col-lg-5 btn  btn-size btn-lg me-5" id="cart-page">
                                        <i class="fas fa-shopping-bag me-2"></i>
                                       Thêm vào giỏ hàng 
                                    </button>
                                    
                                    <button class=" col-lg-5  btn btn-size btn-lg" id = "Ar_pages">
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
                    </div>`;
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

        // thay dổi màu khi chon size 
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
        
        // Xử lý tăng giảm số lượng
        // Lấy các phần tử cần thiết
        const quantityDisplay = document.getElementById("sl");
        const increaseButton = document.getElementById("increase");
        const decreaseButton = document.getElementById("decrease");
        let quantity = 1;
        //tăng số lượng
        increaseButton.addEventListener("mousedown", () => {
            increaseButton.style.backgroundColor = "var(--primary-gold)";
            increaseButton.style.color = "var(--accent-silver) ";
            increaseButton.style.borderColor = "var(--accent-silver) ";
            // Tăng số lượng và cập nhật hiển thị
            quantity++;
            quantityDisplay.textContent = quantity;
        });
        increaseButton.addEventListener("mouseup", () => {
            increaseButton.style.backgroundColor = "";
            increaseButton.style.color = "";
            increaseButton.style.borderColor = "black";
        }); 
        //giảm số lượng
        // Giảm số lượng và cập nhật hiển thị
        decreaseButton.addEventListener("mousedown", () => {
            decreaseButton.style.backgroundColor = "var(--primary-gold)";
            decreaseButton.style.color = "var(--accent-silver) ";   
            decreaseButton.style.borderColor = " var(--accent-silver) ";
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

        // chuyển hướng sang page ar 
        const arPage =document.getElementById("Ar_pages");
        arPage.addEventListener("click", () =>{
            window.location.href = "/pages/ar_try/ar.html";
        });

} catch (error) {
    console.error("Lỗi khi lấy dữ liệu",error);
}
};
getDetailBook();

