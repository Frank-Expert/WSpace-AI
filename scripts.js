

//Hamburger menu

// Toggle the Hamburger Menu
function toggleHamburgerMenu(event) {
    event.stopPropagation(); // Prevent click from bubbling up
    document.getElementById("hamburger-dropdown").classList.toggle("show");
}

// Close menu when clicking outside
function closeHamburgerMenu(event) {
    let menu = document.getElementById("hamburger-dropdown");
    let hamburgerIcon = document.querySelector(".hamburger-menu");

    // Close the menu only if the click is outside the menu and the hamburger icon
    if (!menu.contains(event.target) && !hamburgerIcon.contains(event.target)) {
        menu.classList.remove("show");
    }
}




// Handle submenu hover to prevent flickering
document.addEventListener("DOMContentLoaded", function () {
    let submenus = document.querySelectorAll(".has-submenu");

    submenus.forEach((submenu) => {
        submenu.addEventListener("mouseenter", function () {
            let subMenuElement = this.querySelector(".submenu");
            if (subMenuElement) {
                subMenuElement.style.display = "block";
            }
        });

        submenu.addEventListener("mouseleave", function () {
            let subMenuElement = this.querySelector(".submenu");
            if (subMenuElement) {
                subMenuElement.style.display = "none";
            }
        });
    });

    // Attach click event listeners
    document.querySelector(".hamburger-menu").addEventListener("click", toggleHamburgerMenu);
    document.addEventListener("click", closeHamburgerMenu);
});




//JavaScript for Navigation Block:




// Hero Images Loop
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    const totalSlides = slides.length;
    const stayDuration = 15000; // Duration for each slide (10 seconds)
    let slideTimeout;

    // Initialize the first slide
    function showSlide(index, direction = 'up') {
        // Hide the current slide and update dot
        slides[currentIndex].style.opacity = 0;
        slides[currentIndex].style.transform = direction === 'up' ? 'translateY(-100%)' : 'translateY(100%)';
        dots[currentIndex].classList.remove('active');

        // Update the current index
        currentIndex = index;

        // Show the new slide
        slides[currentIndex].style.transform = 'translateY(0)';
        slides[currentIndex].style.opacity = 1;

        // Animate text
        const heading = slides[currentIndex].querySelector('h1');
        const paragraph = slides[currentIndex].querySelector('p');
        heading.classList.remove('animate-heading');
        paragraph.classList.remove('animate-paragraph');

        // Trigger reflow to restart animation
        void heading.offsetWidth; // Dummy read
        heading.classList.add('animate-heading');
        paragraph.classList.add('animate-paragraph');

        // Highlight the corresponding dot
        dots[currentIndex].classList.add('active');
    }

    // Function to move to the next slide
    function moveToNextSlide() {
        const nextIndex = (currentIndex + 1) % totalSlides;
        showSlide(nextIndex, 'up');
        startSlideTimer(); // Schedule the next slide
    }

    // Function to move to the previous slide
    function moveToPreviousSlide() {
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex, 'down');
        startSlideTimer(); // Schedule the next slide
    }

    // Start the timer for the next slide
    function startSlideTimer() {
        clearTimeout(slideTimeout); // Clear any ongoing timer
        slideTimeout = setTimeout(moveToNextSlide, stayDuration); // Schedule the next slide
    }

    // Event listeners for arrows
    document.querySelector('.left-arrow').addEventListener('click', function () {
        clearTimeout(slideTimeout); // Stop the automatic timer
        moveToPreviousSlide(); // Move manually
    });

    document.querySelector('.right-arrow').addEventListener('click', function () {
        clearTimeout(slideTimeout); // Stop the automatic timer
        moveToNextSlide(); // Move manually
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            clearTimeout(slideTimeout); // Stop the automatic timer
            showSlide(index, index > currentIndex ? 'up' : 'down'); // Show the selected slide
            startSlideTimer(); // Restart the automatic timer
        });
    });

    // Initialize the first slide and start the timer
    showSlide(currentIndex);
    startSlideTimer();
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




//RESOURCES
// Event listener for the chat button
document.getElementById('chat-button').addEventListener('click', function() {
    alert('Chat with our support team will be available soon!'); // Placeholder alert for chat functionality
});

// Consultant form submission handler
document.getElementById('consultant-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting
    alert('Thank you for submitting the form. Our consultant will contact you soon!');
});

// Partner form submission handler
document.getElementById('partner-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting
    alert('Your partnership request has been submitted!');
});

document.getElementById('load-more-btn').addEventListener('click', function () {
    window.location.href = '/blogs'; // Replace '/blogs' with the URL of your full blog page
});

//Guides and Tutorials


//Ensure All Sections are Loaded Before Accessing Them



// Function to load section content
// Function to load section content
function loadSection(section) {
    const mainContent = document.getElementById('main-content');
    const heroSection = document.querySelector('.hero-section');
    const companyInfoSection = document.querySelector('.company-info');
    const trustSection = document.querySelector('.trust-section');
    const whyWspaceAISection = document.querySelector('.why-wspace-ai');
    const futureSection = document.querySelector('.future-section');

    if (section === 'home') {
        // Show Hero, Company Info, Trust, Why WSpace AI, and Future sections
        heroSection.style.display = 'block';
        companyInfoSection.style.display = 'block';
        trustSection.style.display = 'block';
        whyWspaceAISection.style.display = 'block';
        futureSection.style.display = 'block';
    } else {
        // Hide all home sections
        heroSection.style.display = 'none';
        companyInfoSection.style.display = 'none';
        trustSection.style.display = 'none';
        whyWspaceAISection.style.display = 'none';
        futureSection.style.display = 'none';

        // Load the appropriate section content for other sections
        fetch(`${section}-section.html`) // This will correctly fetch the respective sections
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                mainContent.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading section:', error);
                mainContent.innerHTML = '<p>Error loading section. Please try again.</p>';
            });
    }
}

// Load the home section by default when the page first loads
document.addEventListener('DOMContentLoaded', () => {
    loadSection('home');
});



//services section hidden information in each div class
