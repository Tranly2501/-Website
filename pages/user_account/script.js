  
    document.addEventListener("DOMContentLoaded", function () {
      // Toggle password
      document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
          const targetId = this.getAttribute('data-target');
          const input = document.getElementById(targetId);
          const icon = this.querySelector('i');
          if (input.type === 'password') {
            input.type = 'text';
          } else {
            input.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
          }
        });
      });

      // Validate register form
      const registerForm = document.getElementById("registerForm");
      const passwordInput = document.getElementById("password");
      const confirmPasswordInput = document.getElementById("confirmPassword");
      const passwordError = document.getElementById("passwordError");
      const confirmPasswordError = document.getElementById("confirmPasswordError");

      function validatePassword() {
        const password = passwordInput.value.trim();
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(password)) {
          passwordError.textContent = "⚠ Mật khẩu ≥8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt.";
          return false;
        } else {
          passwordError.textContent = "";
          return true;
        }
      }

      function validateConfirmPassword() {
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        if (password !== confirmPassword) {
          confirmPasswordError.textContent = "⚠ Mật khẩu xác nhận không khớp.";
          return false;
        } else {
          confirmPasswordError.textContent = "";
          return true;
        }
      }

      passwordInput.addEventListener("input", validatePassword);
      confirmPasswordInput.addEventListener("input", validateConfirmPassword);

      registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirmPassword();
        if (isPasswordValid && isConfirmValid) {
          alert("Đăng ký thành công!");
          registerForm.reset();
        }
      });
    });
