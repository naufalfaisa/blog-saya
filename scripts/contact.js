function setupContactForm() {
    document.querySelector('.contact-form').addEventListener('submit', function () {
        alert('Pesan Anda sedang dikirim!');
        // Jangan pakai e.preventDefault(); karena itu menghentikan Formsubmit
    });
}

