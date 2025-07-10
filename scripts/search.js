function searchArticles() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm)
    );
    displayArticles([...filteredArticles].reverse(), 'all-articles');
    document.getElementById('pagination').innerHTML = '';
}
