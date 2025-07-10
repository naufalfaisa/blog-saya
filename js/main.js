document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });

    document.getElementById('search-button').addEventListener('click', searchArticles);
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchArticles();
    });

    setupCategoryFilter();
    setupArchiveFilter();
    setupContactForm();
    setupProfileImageReload();
    setupLazyImages();

    navigateTo('home');
});
