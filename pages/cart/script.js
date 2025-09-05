 function formatVND(amount) {
      return amount.toLocaleString("vi-VN") + " ₫";
    }

    function updateCart() {
      const cartItems = document.querySelectorAll(".cart-item");
      let subtotal = 0;
      let itemCount = 0;

      cartItems.forEach(item => {
        const price = parseInt(item.dataset.price);
        const qty = parseInt(item.querySelector(".item-qty").innerText);
        const total = price * qty;
        item.querySelector(".item-total").innerText = formatVND(total);
        subtotal += total;
        itemCount += qty;
      });

      const tax = subtotal * 0.08;
      const grandTotal = subtotal + tax;

      document.getElementById("summary-subtotal").innerText = formatVND(subtotal);
      document.getElementById("summary-tax").innerText = formatVND(tax);
      document.getElementById("summary-total").innerText = formatVND(grandTotal);
      document.getElementById("summary-count").innerText = itemCount;
      document.getElementById("cart-count").innerText = itemCount;

      if (itemCount === 0) {
        document.querySelector(".col-lg-8 .card-body").innerHTML =
          "<p class='text-center py-5'>Giỏ hàng của bạn đang trống.</p>";
      }
    }

    document.addEventListener("click", function (e) {
      if (e.target.closest(".btn-plus")) {
        const qtyElem = e.target.closest(".cart-item").querySelector(".item-qty");
        qtyElem.innerText = parseInt(qtyElem.innerText) + 1;
        updateCart();
      }

      if (e.target.closest(".btn-minus")) {
        const item = e.target.closest(".cart-item");
        const qtyElem = item.querySelector(".item-qty");
        let qty = parseInt(qtyElem.innerText);
        if (qty > 1) {
          qtyElem.innerText = qty - 1;
          updateCart();
        } else {
          item.remove();
          updateCart();
        }
      }

      if (e.target.closest(".btn-remove")) {
        e.target.closest(".cart-item").remove();
        updateCart();
      }
    });

    // Initial load
    updateCart();