function setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function () {
        alert('Pesan Anda sedang dikirim!');
        // Jangan pakai e.preventDefault(); agar tetap terkirim ke Formsubmit
    });
}
