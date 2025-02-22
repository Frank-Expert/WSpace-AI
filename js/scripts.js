console.log("scripts.js has loaded successfully!");

document.addEventListener("DOMContentLoaded", function () {
    console.log("📌 DOM fully loaded");

    let retries = 0;
    let maxRetries = 30; // Stops after 30 retries (3 seconds)
    
    let checkNavInterval = setInterval(() => {
        const navLinks = document.querySelectorAll("nav a");


        if (navLinks.length > 0) {
            // ✅ Found navigation links, stop checking
            clearInterval(checkNavInterval);
            console.log("✅ Navigation links found!");

            // Add event listeners to navigation links
            navLinks.forEach(link => {
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    const section = this.getAttribute("data-section");
                    console.log(`🔄 Navigating to: ${section}`);
                    loadSection(section);
                });
            });

            // ✅ Load home section on first visit
            loadSection("home");
        } else {
            console.warn(`⚠️ Still waiting for navigation links... (Attempt ${retries + 1}/${maxRetries})`);
            retries++;

            if (retries >= maxRetries) {
                clearInterval(checkNavInterval);
                console.error("❌ Navigation not found after max retries. Check if nav exists in index.html.");
            }
        }
    }, 100); // Check every 100ms
});



// Function to toggle the Hamburger Menu
function toggleHamburgerMenu(event) {
    event.stopPropagation(); // Prevent click from bubbling up
    let menu = document.getElementById("hamburger-dropdown");
    menu.classList.toggle("show");
}

// Function to close ALL menus (hamburger + submenus)
function closeAllMenus() {
    let hamburgerDropdown = document.getElementById("hamburger-dropdown");
    let submenus = document.querySelectorAll(".submenu");

    // Hide hamburger menu
    hamburgerDropdown.classList.remove("show");

    // Hide all submenus
    submenus.forEach((submenu) => {
        submenu.style.display = "none";
    });
}

// Function to close submenu when clicking an item inside it
function closeSubMenuOnClick() {
    let allMenuItems = document.querySelectorAll(".submenu a, .navbar a, .hamburger-menu a");

    allMenuItems.forEach((item) => {
        item.addEventListener("click", function () {
            closeAllMenus();
        });
    });
}

// Handle submenu hover to show and hide
document.addEventListener("DOMContentLoaded", function () {
    let submenus = document.querySelectorAll(".has-submenu");

    submenus.forEach((submenu) => {
        let subMenuElement = submenu.querySelector(".submenu");

        submenu.addEventListener("mouseenter", function () {
            if (subMenuElement) {
                subMenuElement.style.display = "block";
            }
        });

        submenu.addEventListener("mouseleave", function () {
            if (subMenuElement) {
                subMenuElement.style.display = "none";
            }
        });
    });

    // Attach event listeners
    document.querySelector(".hamburger-menu").addEventListener("click", toggleHamburgerMenu);
    document.addEventListener("click", function (event) {
        // Close everything if clicking outside of menu
        if (!event.target.closest(".hamburger-menu, .navbar, .submenu")) {
            closeAllMenus();
        }
    });

    closeSubMenuOnClick(); // Ensure menus close on item click
});


//JavaScript for Navigation Block:

console.log("🚀 scripts.js loaded!");

document.addEventListener("DOMContentLoaded", function () {
    console.log("📌 DOM is fully loaded.");

    let heroElement = document.getElementById("hero-slider");
    if (!heroElement) {
        console.error("❌ Hero slider element missing!");
        return;
    }

    console.log("✅ Hero slider found!");

    // Example: Initialize slider (Modify according to your slider)
    initializeHeroSlider();
});

function initializeHeroSlider() {
    console.log("🔄 Initializing Hero Slider...");

    // Your slider code here
}



//STYLISH LOADING OF THE SECTIONS
// Show the loader when the page is loading
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '1'; // Ensure loader is visible
    }
});

// Hide the loader once the page content has loaded
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0'; // Fade out loader
            setTimeout(() => {
                loader.style.display = 'none'; // Remove loader from view once it's faded
            }, 500); // Wait for fade-out transition
        }, 500); // Delay to allow the page to fully load
    }
});

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



//smooth scroll nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    });
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



//COMPANY SECTION

//content
//Book Free Consultation Pop-up
function openModal() {
    document.getElementById('consultationModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('consultationModal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    var modal = document.getElementById('consultationModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


function scrollToCommunity() {
    const resourcesSection = document.getElementById('resources');
    if (resourcesSection) {
        const communityDiv = resourcesSection.querySelector('.community');
        if (communityDiv) {
            communityDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error('Community div not found inside the resources section.');
        }
    } else {
        console.error('Resources section not found.');
    }
}