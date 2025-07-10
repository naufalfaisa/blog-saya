function navigateTo(page) {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('articles-page').style.display = 'none';
    document.getElementById('about-page').style.display = 'none';
    document.getElementById('contact-page').style.display = 'none';

    document.getElementById(`${page}-page`).style.display = 'block';

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });

    if (page === 'home') {
        displayArticles([...articles].reverse(), 'latest-articles', 3);
    } else if (page === 'articles') {
        displayArticles([...articles].reverse(), 'all-articles');
        setupPagination();
    }
}
