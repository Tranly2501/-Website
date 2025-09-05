fetch('/pages/header.html') // Lấy tệp header.html
    .then(response => response.text()) // Chuyển đổi phản hồi thành văn bản
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data; // Chèn nội dung vào phần tử có id là 'header-placeholder'
    })
    .catch(error => {
        console.error('Lỗi khi lấy tệp header.html:', error); // Xử lý lỗi nếu có
    });