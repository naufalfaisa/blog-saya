function searchArticles() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm)
    );
    displayArticles([...filteredArticles].reverse(), 'all-articles');
    document.getElementById('pagination').innerHTML = '';
}

function setupSearch() {
    const input = document.getElementById('search-input');
    const button = document.getElementById('search-button');

    button.addEventListener('click', () => {
        const keyword = input.value.toLowerCase();
        const filtered = articles.filter(article =>
            article.title.toLowerCase().includes(keyword) ||
            article.content.toLowerCase().includes(keyword)
        );
        renderArticles(filtered);
    });
}
