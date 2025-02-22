// Hero Images Loop
// Hero Images Loop
document.addEventListener('DOMContentLoaded', function () {
    console.log("📌 DOM fully loaded");

    let retryCount = 0;
    const maxRetries = 10; // Prevent infinite loop

    function initializeHeroSlider() {
        const heroSlider = document.querySelector(".hero-section .container");

        if (!heroSlider) {
            retryCount++;

            if (retryCount === 1) {
                console.warn("⏳ Hero slider not found. Waiting for it to load...");
            }

            if (retryCount < maxRetries) {
                setTimeout(initializeHeroSlider, 500); // Retry after 500ms
            } else {
                console.error("❌ Hero slider failed to load after multiple attempts!");
            }
            return;
        }

        console.log("✅ Hero slider found!");

        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        let currentIndex = 0;
        const totalSlides = slides.length;
        const stayDuration = 15000; // 15 seconds per slide
        let slideTimeout;

        if (totalSlides === 0) {
            console.error("❌ No slides found!");
            return;
        }

        console.log("🚀 Initializing hero slider...");

        function showSlide(index, direction = 'up') {
            slides[currentIndex].style.opacity = "0";
            slides[currentIndex].style.transform = direction === 'up' ? 'translateY(-100%)' : 'translateY(100%)';
            dots[currentIndex].classList.remove('active');

            currentIndex = index;

            slides[currentIndex].style.transform = 'translateY(0)';
            slides[currentIndex].style.opacity = "1";

            const heading = slides[currentIndex].querySelector('h1');
            const paragraph = slides[currentIndex].querySelector('p');

            if (heading && paragraph) {
                heading.classList.remove('animate-heading');
                paragraph.classList.remove('animate-paragraph');

                void heading.offsetWidth; // Dummy read
                heading.classList.add('animate-heading');
                paragraph.classList.add('animate-paragraph');
            }

            dots[currentIndex].classList.add('active');
        }

        function moveToNextSlide() {
            const nextIndex = (currentIndex + 1) % totalSlides;
            showSlide(nextIndex, 'up');
            startSlideTimer();
        }

        function moveToPreviousSlide() {
            const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            showSlide(prevIndex, 'down');
            startSlideTimer();
        }

        function startSlideTimer() {
            clearTimeout(slideTimeout);
            slideTimeout = setTimeout(moveToNextSlide, stayDuration);
        }

        const leftArrow = document.querySelector('.left-arrow');
        const rightArrow = document.querySelector('.right-arrow');

        if (leftArrow) {
            leftArrow.addEventListener('click', function () {
                clearTimeout(slideTimeout);
                moveToPreviousSlide();
            });
        } else {
            console.error("❌ Left arrow not found!");
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', function () {
                clearTimeout(slideTimeout);
                moveToNextSlide();
            });
        } else {
            console.error("❌ Right arrow not found!");
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function () {
                clearTimeout(slideTimeout);
                showSlide(index, index > currentIndex ? 'up' : 'down');
                startSlideTimer();
            });
        });

        showSlide(currentIndex);
        startSlideTimer();
    }

    initializeHeroSlider(); // Start checking for hero slider
});

