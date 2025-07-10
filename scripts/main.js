document.addEventListener('DOMContentLoaded', function () {
    // Navigasi antar halaman
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });

    // Event pencarian
    document.getElementById('search-button').addEventListener('click', searchArticles);
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchArticles();
    });

    // Reverse artikel sekali saja untuk ditampilkan dari yang terbaru
    const reversedArticles = [...articles].reverse();

    // Tampilkan artikel di halaman beranda dan artikel
    displayArticles(reversedArticles, 'latest-articles', 3);
    displayArticles(reversedArticles, 'all-articles');

    // Inisialisasi pagination
    setupPagination(reversedArticles);

    // Setup fitur lainnya
    setupCategoryFilter();
    setupArchiveFilter();
    setupContactForm();
    setupProfileImageReload?.();
    setupLazyImages?.();

    // Tampilkan halaman default
    navigateTo('home');
});
