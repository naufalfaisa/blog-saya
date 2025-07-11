function renderArticles(filteredArticles) {
    const container = document.getElementById('all-articles');
    container.innerHTML = '';

    if (filteredArticles.length === 0) {
        container.innerHTML = '<p>No articles found.</p>';
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
let articles = [];

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('articles.json');
        articles = await response.json();

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

    } catch (error) {
        console.error('Failed to load article:', error);
        document.getElementById('all-articles').innerHTML = '<p>Failed to load article.</p>';
    }
});

// Fungsi untuk menampilkan artikel
function renderArticles(filteredArticles) {
    const container = document.getElementById('all-articles');
    container.innerHTML = '';

    if (filteredArticles.length === 0) {
        container.innerHTML = '<p>No articles found.</p>';
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

// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('active');
});
// Tutup menu saat item navbar diklik (hanya berlaku di mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

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
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'Mei',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    };
    return months[monthNum];
}

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

function setupPagination(articlesToPaginate) {
    // Validasi: pastikan parameter adalah array
    if (!Array.isArray(articlesToPaginate)) {
        console.error('setupPagination error: parameter is not an array or undefined.', articlesToPaginate);
        return;
    }

    const itemsPerPage = 5;
    const reversedArticles = [...articlesToPaginate].reverse(); // reverse hanya sekali
    const totalPages = Math.ceil(reversedArticles.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');

    paginationContainer.innerHTML = '';

    // Jika tidak ada artikel, jangan lanjut
    if (totalPages === 0) {
        displayArticles([], 'all-articles');
        return;
    }

    // Buat tombol untuk setiap halaman
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;

        pageButton.addEventListener('click', () => {
            const start = (i - 1) * itemsPerPage;
            const end = start + itemsPerPage;

            displayArticles(reversedArticles.slice(start, end), 'all-articles');

            // Update tombol aktif
            document.querySelectorAll('#pagination button').forEach(btn => btn.classList.remove('active'));
            pageButton.classList.add('active');
        });

        paginationContainer.appendChild(pageButton);
    }

    // Tampilkan halaman pertama secara default
    const start = 0;
    const end = itemsPerPage;
    displayArticles(reversedArticles.slice(start, end), 'all-articles');

    // Tandai tombol pertama sebagai aktif
    paginationContainer.querySelector('button')?.classList.add('active');
}

function displayArticles(articlesToShow, containerId, limit = null) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const articlesToDisplay = limit ? articlesToShow.slice(0, limit) : articlesToShow;

    articlesToDisplay.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.className = 'blog-post';
        articleElement.innerHTML = `
            <h2 class="post-title">${article.title}</h2>
            <div class="post-meta">Posted on ${article.date} • Category: ${getCategoryName(article.category)}</div>
            <div class="post-content">
                <p>${article.content}</p>
            </div>
            <a href="#" class="read-more">Read more →</a>
        `;
        container.appendChild(articleElement);
    });
}

function getCategoryName(category) {
    const categories = {
        'anime': 'Anime',
        'game': 'Game',
        'coding': 'Coding',
        'life': 'Life'
    };
    return categories[category] || category;
}

function setupProfileImageReload() {
    const profileImg = document.querySelector('.profile-picture img');
    if (profileImg) {
        profileImg.src = profileImg.src.includes('?')
            ? profileImg.src.split('?')[0] + '?t=' + Date.now()
            : profileImg.src + '?t=' + Date.now();

        profileImg.onerror = function () {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'profile-fallback';
            this.parentNode.appendChild(fallback);
        };
    }
}

function setupLazyImages() {
    const images = document.querySelectorAll('img:not(.profile-picture img)');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    if (image.dataset.src) {
                        image.src = image.dataset.src;
                        image.onload = () => image.removeAttribute('data-src');
                        image.onerror = () => image.style.display = 'none';
                        observer.unobserve(image);
                    }
                }
            });
        }, { rootMargin: '200px' });

        images.forEach(image => {
            if (!image.src && image.dataset.src) {
                imageObserver.observe(image);
            }
        });
    } else {
        images.forEach(image => {
            if (image.dataset.src) {
                image.src = image.dataset.src;
            }
        });
    }
}

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
