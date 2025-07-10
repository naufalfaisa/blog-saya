function setupCategoryFilter() {
    document.querySelectorAll('[data-category]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;

            const filtered = articles.filter(article => article.category === category);

            navigateTo('articles');
            renderArticles(filtered);
            setupPagination(filtered);
        });
    });
}

function setupArchiveFilter() {
    document.querySelectorAll('[data-archive]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const archive = link.dataset.archive; // "2025-07"
            const [year, month] = archive.split('-');
            const monthName = monthToText(month); // e.g. "Juli"

            const filtered = articles.filter(article =>
                article.date.includes(`${monthName} ${year}`)
            );

            navigateTo('articles');
            displayArticles(filtered, 'all-articles');
            setupPagination(filtered); // tetap aktifkan pagination
        });
    });
}


function monthToText(monthNum) {
    const months = {
        '01': 'Januari',
        '02': 'Februari',
        '03': 'Maret',
        '04': 'April',
        '05': 'Mei',
        '06': 'Juni',
        '07': 'Juli',
        '08': 'Agustus',
        '09': 'September',
        '10': 'Oktober',
        '11': 'November',
        '12': 'Desember'
    };
    return months[monthNum];
}
