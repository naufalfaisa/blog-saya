// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Data artikel
const articles = [
    { id: 1, title: 'Judul Artikel Pertama', date: '10 Juli 2023', category: 'technology', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.' },
    { id: 2, title: 'Judul Artikel Kedua', date: '5 Juli 2023', category: 'education', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.' },
    { id: 3, title: 'Judul Artikel Ketiga', date: '3 Juli 2023', category: 'hobby', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.' },
    { id: 4, title: 'Judul Artikel Keempat', date: '1 Juli 2023', category: 'life', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.' },
    { id: 5, title: 'Judul Artikel Kelima', date: '28 Juni 2023', category: 'technology', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.' },
    { id: 6, title: 'Judul Artikel Keenam', date: '25 Juni 2023', category: 'education', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.' },
    { id: 7, title: 'Judul Artikel Ketujuh', date: '20 Juni 2023', category: 'hobby', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.' },
    { id: 8, title: 'Judul Artikel Kedelapan', date: '15 Juni 2023', category: 'life', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.' },
    { id: 9, title: 'Judul Artikel Kesembilan', date: '10 Juni 2023', category: 'technology', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.' },
    { id: 10, title: 'Judul Artikel Kesepuluh', date: '5 Juni 2023', category: 'education', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.' },
    { id: 11, title: 'Judul Artikel Sebelas', date: '1 Juni 2023', category: 'hobby', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.' },
    { id: 12, title: 'Judul Artikel Dua Belas', date: '28 Mei 2023', category: 'life', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.' }
];

// Fungsi untuk menampilkan artikel
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

// Fungsi untuk mendapatkan nama kategori
function getCategoryName(category) {
    const categories = {
        'technology': 'Teknologi',
        'education': 'Pendidikan',
        'hobby': 'Hobi',
        'life': 'Kehidupan'
    };
    return categories[category] || category;
}

// Fungsi untuk navigasi halaman
function navigateTo(page) {
    // Sembunyikan semua halaman
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('articles-page').style.display = 'none';
    document.getElementById('about-page').style.display = 'none';
    document.getElementById('contact-page').style.display = 'none';
    
    // Tampilkan halaman yang dipilih
    document.getElementById(`${page}-page`).style.display = 'block';
    
    // Update navigasi aktif
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });
    
    // Load konten sesuai halaman
    if (page === 'home') {
        displayArticles([...articles].reverse(), 'latest-articles', 3);
    } else if (page === 'articles') {
        displayArticles([...articles].reverse(), 'all-articles');
        setupPagination();
    }
}

// Fungsi untuk setup pagination
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
            
            // Update active button
            document.querySelectorAll('#pagination button').forEach(btn => {
                btn.classList.remove('active');
            });
            pageButton.classList.add('active');
        });
        
        if (i === 1) {
            pageButton.classList.add('active');
            displayArticles([...articles].reverse().slice(0, itemsPerPage), 'all-articles');
        }
        
        paginationContainer.appendChild(pageButton);
    }
}

// Fungsi untuk pencarian artikel
function searchArticles() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm) || 
        article.content.toLowerCase().includes(searchTerm)
    );
    displayArticles([...filteredArticles].reverse(), 'all-articles');
    document.getElementById('pagination').innerHTML = '';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Navigasi
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });
    
    // Pencarian
    document.getElementById('search-button').addEventListener('click', searchArticles);
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchArticles();
        }
    });
    
    // Filter kategori
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
    
    // Filter arsip
    document.querySelectorAll('[data-archive]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Implementasi filter berdasarkan bulan/tahun bisa ditambahkan di sini
            navigateTo('articles');
            document.getElementById('pagination').innerHTML = '';
        });
    });
    
    // Form kontak
    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Pesan Anda telah terkirim!');
        this.reset();
    });
    
    // Load halaman awal
    navigateTo('home');
    
    // Optimasi gambar (tetap sama)
    const profileImg = document.querySelector('.profile-picture img');
    if (profileImg) {
        profileImg.src = profileImg.src.includes('?') 
            ? profileImg.src.split('?')[0] + '?t=' + Date.now()
            : profileImg.src + '?t=' + Date.now();
        
        profileImg.onerror = function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'profile-fallback';
            fallback.textContent = '';
            this.parentNode.appendChild(fallback);
        };
    }
    
    // Lazy loading untuk gambar lainnya (tetap sama)
    const images = document.querySelectorAll('img:not(.profile-picture img)');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    if (image.dataset.src) {
                        image.src = image.dataset.src;
                        image.onload = function() {
                            image.removeAttribute('data-src');
                        };
                        image.onerror = function() {
                            image.style.display = 'none';
                        };
                        observer.unobserve(image);
                    }
                }
            });
        }, {
            rootMargin: '200px'
        });
        
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
});