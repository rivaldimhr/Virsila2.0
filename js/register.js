
document.querySelector("form").addEventListener("submit", function(event) {
    // Mencegah pengiriman form sampai validasi selesai
    event.preventDefault();
  
    // Validasi email
    const emailInput = document.querySelector('input[placeholder="Enter your Email"]');
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  
    // Hapus pesan error jika sudah ada
    const existingErrorMsg = emailInput.parentNode.querySelector(".error-msg");
    if (existingErrorMsg) {
        existingErrorMsg.remove();
    }
  
    if (!emailPattern.test(emailInput.value)) {
        const errorMsg = document.createElement("p");
        errorMsg.textContent = "Please enter a valid email address.";
        errorMsg.style.color = "red";
        errorMsg.classList.add("error-msg"); // Tambahkan kelas untuk identifikasi
        emailInput.parentNode.appendChild(errorMsg);
        return; // Keluar dari fungsi jika email tidak valid
    }
  
    // Validasi password
    const password = document.querySelector('input[placeholder="Create a password"]');
    const confirmPassword = document.querySelector('input[placeholder="Confirm a password"]');
  
    // Minimal panjang password 8 karakter
    if (password.value.length < 8) {
        alert("Password must be at least 8 characters long.");
        return; // Keluar dari fungsi jika panjang password kurang dari 8 karakter
    }
  
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match. Please try again.");
        return; // Keluar dari fungsi jika password tidak sesuai
    }
  
    // Jika semua validasi berhasil, submit form
    event.target.submit();
  });
  
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Contoh email dan password yang valid untuk demo
    const validEmail = "user@example.com";
    const validPassword = "password123";
  
    // Periksa validitas email dan password
    if (email === validEmail && password === validPassword) {
        // Jika valid, arahkan ke halaman utama
        window.location.href = "index.html";  // Ubah dengan URL halaman utama Anda
    } else {
        // Jika tidak valid, tampilkan pesan error
        alert("Email atau password salah. Silakan coba lagi.");
    }
  });
  