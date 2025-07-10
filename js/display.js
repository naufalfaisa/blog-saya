function displayArticles(articlesToShow, containerId, limit = null) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const articlesToDisplay = limit ? articlesToShow.slice(0, limit) : articlesToShow;

    articlesToDisplay.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.className = 'blog-post';
        articleElement.innerHTML = `
            <h2 class="post-title">${article.title}</h2>
            <div class="post-meta">Diposting pada ${article.date} • Kategori: ${getCategoryName(article.category)}</div>
            <div class="post-content">
                <p>${article.content}</p>
            </div>
            <a href="#" class="read-more">Baca selengkapnya →</a>
        `;
        container.appendChild(articleElement);
    });
}

function getCategoryName(category) {
    const categories = {
        'technology': 'Teknologi',
        'education': 'Pendidikan',
        'hobby': 'Hobi',
        'life': 'Kehidupan'
    };
    return categories[category] || category;
}
