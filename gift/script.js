document.addEventListener('DOMContentLoaded', () => {
    const openGiftBtn = document.getElementById('open-gift-btn');
    const heroSection = document.querySelector('.hero');
    const mainContent = document.getElementById('main-content');
    const heartsContainer = document.querySelector('.hearts-container');

    // Create floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';

        // Randomize size and position
        const size = Math.random() * 20 + 10 + 'px';
        const left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 3 + 4 + 's';

        heart.style.fontSize = size;
        heart.style.left = left;
        heart.style.animationDuration = duration;

        heartsContainer.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, parseFloat(duration) * 1000);
    }

    // Generate hearts periodically
    setInterval(createHeart, 300);

    // Initial burst of hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 100);
    }

    // Handle "Open Gift" click
    openGiftBtn.addEventListener('click', () => {
        // Smoothly scroll or transition to main content
        heroSection.style.transform = 'translateY(-100vh)';
        heroSection.style.opacity = '0';

        setTimeout(() => {
            heroSection.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');

            // Trigger heart explosion on open
            for (let i = 0; i < 50; i++) {
                setTimeout(createHeart, i * 50);
            }
        }, 800);
    });

    // Optional: Add scroll reveal animations for gallery items if needed
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-item, .year-card').forEach(item => {
        // Set initial state for animation
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    // Collect gallery images for navigation
    const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
    let currentGalleryIndex = -1;

    function openLightbox(src, galleryIndex) {
        lightboxImg.src = src;
        currentGalleryIndex = galleryIndex;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Show arrows only for gallery images
        if (galleryIndex >= 0) {
            lightbox.classList.add('has-nav');
        } else {
            lightbox.classList.remove('has-nav');
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.classList.remove('has-nav');
        document.body.style.overflow = '';
        currentGalleryIndex = -1;
    }

    function showPrev() {
        if (currentGalleryIndex < 0) return;
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentGalleryIndex].src;
    }

    function showNext() {
        if (currentGalleryIndex < 0) return;
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentGalleryIndex].src;
    }

    // Click on gallery images (with navigation)
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(img.src, index));
    });

    // Click on timeline images (no navigation)
    document.querySelectorAll('.year-img-container img').forEach(img => {
        img.addEventListener('click', () => openLightbox(img.src, -1));
    });

    // Arrow clicks
    lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

    // Close lightbox
    lightboxClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
});
