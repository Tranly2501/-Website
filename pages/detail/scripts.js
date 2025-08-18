

//2. Phần truy cập đến link detail của từng sản phẩm 
const detailContain = document.getElementById("detail")

// const path = new URLSearchParams(window.location.search);
// const id = path.get('id');
// console.log(id);
const getDetailBook = async () => {
    try {
    const url = new URLSearchParams(window.location.search);

    const bookId = url.get('id');

    const respone = await fetch('/dataProduct.json');

    const data = await respone.json();
    console.log(data);

    const findBookById = data.find(item => item.id === Number(bookId));
        console.log(findBookById);
        
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
                            <div class="card-body">
                                <h1 class="h2 fw-bold mb-3 text-navy title">${findBookById.title}</h1>

                               <!-- danh gia 
                                <div class="d-flex align-items-center mb-">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star text-gold fill-current">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star text-gold fill-current">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star text-gold fill-current">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star text-gold fill-current">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star text-gold fill-current">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                </div> -->

                                <!-- giá sản phẩm -->
                                <div class="d-flex align-items-center mb-4">
                                 <span class="h2 fw-bold text-navy mb-0 title">${findBookById.price}</span>
                                </div>
                                <!-- Mô tả sản phẩm -->
                                 <div class="text-muted mb-4 title ">
                                    ${findBookById.description}
                                </div>

                                 <!-- kích cỡ -->
                                  <div class="mb-4"> 
                                    <h5 class="fw-semibold mb-2 title "> Kích cỡ </h5>
                                    <div class="row g-2 title" id="size">
                                        <div class="col-auto ">
                                            <button class="btn button btn-outline-secondary" >16cm</button>
                                        </div>
                                        <div class="col-auto">
                                            <button class="btn button btn-outline-secondary">17cm</button>
                                        </div>
                                        <div class="col-auto">
                                            <button class="btn button btn-outline-secondary">18cm</button>
                                        </div>
                                        <div class="col-auto">
                                            <button class="btn button btn-outline-secondary ">19cm</button>
                                        </div>
                                    </div>
                                  </div>

                                  <!-- Số lượng -->
                                <div class="mb-4">
                                    <h5 class="fw-semibold mb-2 title">Số lượng</h5>
                                    <div class="d-flex align-items-center">
                                        <button class="btn  btn-gold">-</button>
                                            <span class="mx-3 h5 mb-0">1</span>
                                        <button class="btn btn-outline-secondary">+</button>
                                    </div>
                                </div>
                                <!-- Hành động  -->
                                 <div class="d-grid gap-2 mb-4">
                                <button class="btn btn-gold btn-lg">
                                    <i class="fas fa-shopping-bag me-2"></i>
                                   Thêm vào giỏ hàng 
                                </button>
                                
                                <button class="btn btn-outline-secondary btn-lg">
                                    <i class="fas fa-heart me-2"></i>
                                    Trải nghiệm AR
                                </button>
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
        const buttons = document.querySelectorAll(".button");
        buttons.forEach( (btn) => {
            btn.addEventListener("click", function () {
                buttons.forEach(act => act.classList.remove("activeButton"));

                this.classList.add("activeButton");
            });
        });



} catch (error) {
    console.error("Lỗi khi lấy dữ liệu",error);
}
};
getDetailBook();

