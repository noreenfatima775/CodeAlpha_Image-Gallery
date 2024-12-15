const galleryContainer = document.querySelector('.gallery');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.close');
const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');

let images = [];
let currentIndex = 0;

// Fetch images based on a query or random ones
function fetchImages() {
    galleryContainer.innerHTML = ''; // Clear the current gallery
    images = []; // Reset the images array

    for (let i = 0; i < 60; i++) {
        // Load smaller versions in the gallery for faster performance
        const thumbnailUrl = `https://picsum.photos/id/${i}/300/200`; 
        const fullImageUrl = `https://picsum.photos/id/${i}/1200/800`; 

        const img = document.createElement('img');
        img.src = thumbnailUrl;
        img.alt = `Image ${i + 1}`;

        // Save the full-size URL for lightbox viewing
        img.dataset.fullImage = fullImageUrl;

        img.addEventListener('click', () => openLightbox(i));
        galleryContainer.appendChild(img);

        images.push(fullImageUrl); // Store full-size images
    }
}


// Initialize the gallery
fetchImages();

document.addEventListener('keydown', function(event) {
    const lightbox = document.querySelector('.lightbox');
    const images = document.querySelectorAll('.gallery img');
    const lightboxImg = document.querySelector('.lightbox img');

    let currentIndex = Array.from(images).findIndex(img => img.src === lightboxImg.src);

    if (lightbox.style.display === 'flex') {
        switch (event.key) {
            case 'ArrowRight':
                if (currentIndex < images.length - 1) {
                    currentIndex++;
                    updateLightboxImage(images[currentIndex]);
                }
                break;
            case 'ArrowLeft':
                if (currentIndex > 0) {
                    currentIndex--;
                    updateLightboxImage(images[currentIndex]);
                }
                break;
            case 'Backspace':
                lightbox.style.display = 'none';
                break;
        }
    } else {
        switch (event.key) {
            case 'ArrowUp':
                window.scrollBy({ top: -100, behavior: 'smooth' });
                break;
            case 'ArrowDown':
                window.scrollBy({ top: 100, behavior: 'smooth' });
                break;
        }
    }

    function updateLightboxImage(imageElement) {
        const newSrc = imageElement.src;
        lightboxImg.src = newSrc;
        lightboxImg.style.maxWidth = '90vw';
        lightboxImg.style.maxHeight = '90vh';
        lightboxImg.style.objectFit = 'contain';
    }
});


function openLightbox(index) {
    currentIndex = index;
    lightboxImage.src = images[currentIndex];
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImage.src = images[currentIndex];
}

function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImage.src = images[currentIndex];
}

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

