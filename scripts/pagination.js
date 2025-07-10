function setupPagination() {
    const itemsPerPage = 5;
    const totalPages = Math.ceil(articles.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;

        pageButton.addEventListener('click', () => {
            const start = (i - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            displayArticles([...articles].reverse().slice(start, end), 'all-articles');

            document.querySelectorAll('#pagination button').forEach(btn => btn.classList.remove('active'));
            pageButton.classList.add('active');
        });

        if (i === 1) {
            pageButton.classList.add('active');
            displayArticles([...articles].reverse().slice(0, itemsPerPage), 'all-articles');
        }

        paginationContainer.appendChild(pageButton);
    }
}
