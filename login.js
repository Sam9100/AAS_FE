// URL base dari API Anda telah diperbarui.
const API_URL = 'https://asia-southeast2-personalsmz.cloudfunctions.net/ProjectSmZ';

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const payload = { email, password };

    try {
        const response = await fetch(`${API_URL}/aas/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Login Gagal!');
        }
        
        const result = await response.json();
        
        // Simpan nama pengguna ke localStorage
        localStorage.setItem('userName', result.userName);

        // Tampilkan notifikasi sukses dan alihkan halaman
        Swal.fire({
            icon: 'success',
            title: 'Login Berhasil!',
            text: `Selamat datang kembali, ${result.userName}!`,
            timer: 2000, // Notifikasi hilang setelah 2 detik
            showConfirmButton: false
        }).then(() => {
            window.location.href = 'dashboard.html'; // Alihkan ke dashboard
        });

    } catch (error) {
        // Tampilkan notifikasi error
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message
        });
    }
});