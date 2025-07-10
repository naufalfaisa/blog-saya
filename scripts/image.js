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
