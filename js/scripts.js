
// For SPA (Single Page App) navigation between sections
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'flex'; // Show loader when new content is loaded dynamically
        loader.style.opacity = '1';

        // Simulate loading delay (remove this once content is dynamically loaded)
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 2000); // Adjust this to match your content loading time
    }
});


//RESEARCH RESPONSIVE scrollBehavior: 

document.addEventListener('DOMContentLoaded', function () {
    var elements = document.querySelectorAll('.scroll-animation');
    var options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    elements.forEach(function (element) {
        observer.observe(element);
    });
});





//content
//Book Free Consultation Pop-up
function openModalWithLoading() {
    const loadingSpinner = document.getElementById('loading-spinner');
    const modal = document.getElementById('consultationModal');

    if (!modal) {
        console.error("❌ Modal not found! Ensure 'consultationModal' exists in the loaded section.");
        return;
    }

    // Show loading spinner
    loadingSpinner.classList.remove('hidden');

    setTimeout(() => {
        loadingSpinner.classList.add('hidden'); // Hide spinner
        modal.style.display = 'block'; // Show modal
    }, 500);
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('consultationModal');
    if (modal) {
        modal.style.display = 'none';
    }
}
