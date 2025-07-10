function setupContactForm() {
    document.querySelector('.contact-form').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Pesan Anda telah terkirim!');
        this.reset();
    });
}
