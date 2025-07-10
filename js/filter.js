function setupCategoryFilter() {
    document.querySelectorAll('[data-category]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            const filteredArticles = articles.filter(article => article.category === category);
            navigateTo('articles');
            displayArticles([...filteredArticles].reverse(), 'all-articles');
            document.getElementById('pagination').innerHTML = '';
        });
    });
}

function setupArchiveFilter() {
    document.querySelectorAll('[data-archive]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('articles');
            document.getElementById('pagination').innerHTML = '';
        });
    });
}
