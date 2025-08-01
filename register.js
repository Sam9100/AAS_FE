// URL base dari API Anda telah diperbarui.
const API_URL = 'https://asia-southeast2-personalsmz.cloudfunctions.net/ProjectSmZ';

const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const payload = { name, email, password };

    try {
        const response = await fetch(`${API_URL}/aas/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Registrasi gagal!');
        }

        const result = await response.json();
        
        Swal.fire({
            icon: 'success',
            title: 'Registrasi Berhasil!',
            text: 'Akun Anda telah dibuat. Silakan login.',
            timer: 2500,
            showConfirmButton: false
        }).then(() => {
            window.location.href = 'index.html'; // Alihkan ke halaman login (index.html)
        });

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal Mendaftar',
            text: error.message
        });
    }
});