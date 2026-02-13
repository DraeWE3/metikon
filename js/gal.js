 // Configuration
        const TOTAL_IMAGES = 40;
        const IMAGES_PER_LOAD = 20;
        let currentImageCount = 0;

        // Get DOM elements
        const galleryGrid = document.getElementById('galleryGrid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const loading = document.getElementById('loading');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxClose = document.getElementById('lightboxClose');

        // Function to create a gallery item
        function createGalleryItem(imageNumber) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = `../images/gallery/${imageNumber}.jpeg`;
            img.alt = `Gallery image ${imageNumber}`;
            img.loading = 'lazy';
            
            // Add click event to open lightbox
            img.addEventListener('click', () => {
                openLightbox(img.src);
            });

            // Handle image load error
            img.addEventListener('error', () => {
                console.error(`Failed to load image: ${imageNumber}.jpeg`);
                // Optional: You can set a placeholder image here
                // img.src = './path/to/placeholder.jpg';
            });

            item.appendChild(img);
            return item;
        }

        // Function to load images
        function loadImages(count) {
            loading.classList.add('active');
            loadMoreBtn.disabled = true;

            // Simulate a slight delay for better UX
            setTimeout(() => {
                const startIndex = currentImageCount + 1;
                const endIndex = Math.min(currentImageCount + count, TOTAL_IMAGES);

                for (let i = startIndex; i <= endIndex; i++) {
                    const item = createGalleryItem(i);
                    galleryGrid.appendChild(item);
                }

                currentImageCount = endIndex;

                // Hide load more button if all images are loaded
                if (currentImageCount >= TOTAL_IMAGES) {
                    loadMoreBtn.classList.add('hidden');
                }

                loading.classList.remove('active');
                loadMoreBtn.disabled = false;
            }, 500);
        }

        // Function to open lightbox
        function openLightbox(src) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Function to close lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Event listeners
        loadMoreBtn.addEventListener('click', () => {
            loadImages(IMAGES_PER_LOAD);
        });

        lightboxClose.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close lightbox with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

        // Initial load
        loadImages(IMAGES_PER_LOAD);