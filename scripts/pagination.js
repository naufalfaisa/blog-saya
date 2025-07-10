function setupPagination(articlesToPaginate) {
    // Validasi: pastikan parameter adalah array
    if (!Array.isArray(articlesToPaginate)) {
        console.error('setupPagination error: parameter bukan array atau undefined.', articlesToPaginate);
        return;
    }

    const itemsPerPage = 5;
    const reversedArticles = [...articlesToPaginate].reverse(); // reverse hanya sekali
    const totalPages = Math.ceil(reversedArticles.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');

    paginationContainer.innerHTML = '';

    // Jika tidak ada artikel, jangan lanjut
    if (totalPages === 0) {
        displayArticles([], 'all-articles');
        return;
    }

    // Buat tombol untuk setiap halaman
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;

        pageButton.addEventListener('click', () => {
            const start = (i - 1) * itemsPerPage;
            const end = start + itemsPerPage;

            displayArticles(reversedArticles.slice(start, end), 'all-articles');

            // Update tombol aktif
            document.querySelectorAll('#pagination button').forEach(btn => btn.classList.remove('active'));
            pageButton.classList.add('active');
        });

        paginationContainer.appendChild(pageButton);
    }

    // Tampilkan halaman pertama secara default
    const start = 0;
    const end = itemsPerPage;
    displayArticles(reversedArticles.slice(start, end), 'all-articles');

    // Tandai tombol pertama sebagai aktif
    paginationContainer.querySelector('button')?.classList.add('active');
}
