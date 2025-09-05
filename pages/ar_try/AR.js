
  document.addEventListener("DOMContentLoaded", function () {
    // Luôn kích hoạt tab Vòng tay khi reload
    var triggerEl = document.querySelector('#necklaces-tab');
    var tab = new bootstrap.Tab(triggerEl);
    tab.show();
  });

  navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false })
  .then(stream => {
    const video = document.getElementById('video');
    video.srcObject = stream;
    video.style.transform = "scaleX(-1)"; // chỉ lật khi dùng camera trước
  })
  .catch(err => {
    console.error("Lỗi truy cập camera:", err);
  });


    