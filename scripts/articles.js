function renderArticles(filteredArticles) {
    const container = document.getElementById('all-articles');
    container.innerHTML = '';

    if (filteredArticles.length === 0) {
        container.innerHTML = '<p>Tidak ada artikel ditemukan.</p>';
        return;
    }

    filteredArticles.forEach(article => {
        const el = document.createElement('div');
        el.className = 'article';
        el.innerHTML = `
            <h3>${article.title}</h3>
            <p><small>${article.date} | ${article.category}</small></p>
            <p>${article.content}</p>
        `;
        container.appendChild(el);
    });
}

// Data artikel
const articles = [
    {
        id: 1,
        title: 'Artikel 1',
        date: '3 Agustus 2024',
        category: 'life',
        content: 'Lorem ipsum dolor sit amet...'
    },
    {
        id: 2,
        title: 'Artikel 2',
        date: '10 Juli 2025',
        category: 'coding',
        content: 'Lorem ipsum dolor sit amet...'
    },
    // Tambah artikel lain di sini...
];

// Fungsi untuk menampilkan artikel
function renderArticles(filteredArticles) {
    const container = document.getElementById('all-articles');
    container.innerHTML = '';

    if (filteredArticles.length === 0) {
        container.innerHTML = '<p>Tidak ada artikel ditemukan.</p>';
        return;
    }

    filteredArticles.forEach(article => {
        const el = document.createElement('div');
        el.className = 'article';
        el.innerHTML = `
            <h3>${article.title}</h3>
            <p><small>${article.date} | ${article.category}</small></p>
            <p>${article.content}</p>
        `;
        container.appendChild(el);
    });
}