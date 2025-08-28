
  document.addEventListener("DOMContentLoaded", function () {
    // Luôn kích hoạt tab Vòng tay khi reload
    var triggerEl = document.querySelector('#necklaces-tab');
    var tab = new bootstrap.Tab(triggerEl);
    tab.show();
  });

  const video = document.getElementById('video');

  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => {
      console.error('Lỗi truy cập camera:', err);
    });

    