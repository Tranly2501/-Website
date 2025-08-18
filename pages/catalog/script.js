// product
const  listProduct = document.querySelector("#list");

const getDataFromJson = async () =>{
   
   try {
    const respone = await fetch('/dataProduct.json');

    const data = await respone.json();

    if(data) {
        listProduct.innerHTML = data.map(item => {
            return `                    <div class=" col-12 col-md-6 col-lg-4" id="item">
                        <div class="card  h-100 ">
                            <!-- Link khi bấm  vào sẵn đến trang mua hiện thị đầy đủ thông về sp  -->
                            <a href="/pages/detail/detailProduct.html?id=${item.id}" >
                                <img class="card-img-top product-card  object-fit-cover"  style="height: 16rem;" src="${item.imgUrl}" alt="${item.title}" >
                            </a>                            
                            <div class="card-body">
                                <!-- title -->
                                <a  class="card-title text-navy mb-2 text-decoration-none font-serif fs-4" href="/pages/detail/detailProduct.html?id=${item.id}">Sapphire Tennis Bracelet</a>
                                <!-- đánh giá  -->
                                <div class="d-flex align-items-center mb-2">
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
                                </div>
                                <!-- mô tả  -->
                                <p class="fs-6 text-secondary mb-3 text-truncate clamp-2 text-wrap">
                                    ${item.description}
                                </p>
                                <!-- giá -->
                                <div class="d-flex align-items-center justify-content-between">
                                        <span class="fs-4 fw-bold text-navy ">${item.price}</span>
                                </div>         
                        </div>

                        </div>
                    </div>
                       `;
        }).join("");
} else {
    listProduct.innerHTML="<p> Khong co san pham nao </p>";
}

} catch (error) {
console.error(" Loi ",error)};
};
getDataFromJson();


