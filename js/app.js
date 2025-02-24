// 🚀 FUNCTION TO UPDATE META TAGS DYNAMICALLY
function updateMetaTags(title, description) {
    document.title = title;
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
        metaDescription.setAttribute("content", description);
    }
}

// ✅ FUNCTION TO LOAD SECTION CSS
function loadSectionCSS(section) {
    let cssPath = `sections/${section}-section.css`; // ✅ Ensure path is correct

    fetch(cssPath, { method: "HEAD" })
        .then(response => {
            if (response.ok) {
                let existingLink = document.querySelector(`link[href="${cssPath}"]`);
                if (!existingLink) {
                    let link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = cssPath;
                    document.head.appendChild(link);
                    console.log(`✅ Loaded CSS: ${cssPath}`);
                } else {
                    console.log(`♻️ CSS already loaded: ${cssPath}`);
                }
            } else {
                console.warn(`⚠️ CSS File Not Found: ${cssPath} (Skipping Load)`);
            }
        })
        .catch(error => console.warn(`⚠️ CSS Load Error: ${error.message}`));
}


// 🚀 FUNCTION TO LOAD SECTION-SPECIFIC JS
function loadSectionJS(section) {
    // ✅ Remove previous section-specific JavaScript
    let existingScript = document.getElementById("dynamic-section-js");
    if (existingScript) existingScript.remove();

    // ✅ Define the script URL
    let sectionJSUrl = `/sections/${section}-section.js`;

    // 🔍 Debugging Log - Checking if JS file exists
    console.log(`🔍 Checking JS File: ${sectionJSUrl}`);

    // ✅ Use a JavaScript `Image` object to check if the file exists without triggering an actual error
    let testRequest = new XMLHttpRequest();
    testRequest.open('HEAD', sectionJSUrl, true);
    
    testRequest.onreadystatechange = function () {
        if (testRequest.readyState === 4) {
            if (testRequest.status === 200) {
                // ✅ If file exists, load it dynamically
                let sectionJS = document.createElement("script");
                sectionJS.id = "dynamic-section-js";
                sectionJS.src = sectionJSUrl;

                // ✅ Debugging Logs
                sectionJS.onload = () => console.log(`✅ Loaded: ${sectionJSUrl}`);
                sectionJS.onerror = () => console.warn(`⚠️ Error Loading JS: ${sectionJSUrl}`);

                // ✅ Append script to <body>
                document.body.appendChild(sectionJS);
            } else {
                // ✅ Silently skip missing JS without triggering an error
                console.warn(`⚠️ JS Not Found: ${sectionJSUrl} (Skipping)`);
            }
        }
    };

    // ✅ Send request
    testRequest.send();
}


// 🚀 FUNCTION TO LOAD A SECTION DYNAMICALLY
// ✅ Track the currently loaded section to prevent duplicate fetches
let currentSection = null;
// 🚀 Function to Load a Section Dynamically
function loadSection(section, updateHistory = true) {
    // ✅ Get the container where sections will be loaded
    const mainContent = document.getElementById("main-content");
    if (!mainContent) {
        console.error("❌ Error: 'main-content' container is missing!");
        return;
    }

    // ✅ Prevent loading the same section multiple times
    if (currentSection === section) {
        console.log(`⚠️ Section '${section}' is already loaded. Skipping fetch.`);
        return; // Exit the function
    }
    currentSection = section; // ✅ Update the current section

    // ✅ Set the correct path for section HTML
    let sectionPath = `sections/${section}-section.html`;
    

    // 🔍 Debugging Log - To check if the HTML is fetched
    console.log(`🔍 Fetching Section: ${sectionPath}`);

    

    fetch(sectionPath)
        .then(response => {
            if (!response.ok) throw new Error(`❌ Failed to load ${sectionPath} (Status: ${response.status})`);
            return response.text();
        })
        .then(html => {
            // ✅ Inject content into the main content area
            mainContent.innerHTML = html;
            console.log(`✅ Loaded: ${sectionPath}`);

            // ✅ Load CSS & JS for the section
            loadSectionCSS(section);
            loadSectionJS(section);

            // ✅ Update meta tags dynamically for SEO (Optional)
            const metaTags = {
                home: ["WSpace AI - Leading AI Innovations", "Explore WSpace AI's cutting-edge AI solutions."],
                services: ["Our AI Services - WSpace AI", "Explore our cutting-edge AI services."],
                products: ["Our AI Products - WSpace AI", "Discover our innovative AI-driven products."],
                pricing: ["Pricing - WSpace AI", "Check our AI service pricing options."],
                resources: ["Resources - WSpace AI", "Explore AI blogs, tutorials, and guides."],
                company: ["About WSpace AI", "Learn about our company and mission."],
                contacts: ["Contact Us - WSpace AI", "Get in touch with WSpace AI."]
            };

            updateMetaTags(...(metaTags[section] || metaTags["home"]));

            // ✅ Update the URL if triggered by navigation
            if (updateHistory) updateURL(section);

            // ✅ Close the hamburger menu (for mobile navigation)
            closeHamburgerMenu();
        })
        .catch(error => {
            console.error("❌ Error:", error);
            mainContent.innerHTML = "<p style='color: red;'>Error loading content. Please try again.</p>";
        });
}





//SPINE LOAD SECTION/LINKS/BUTTONS
// 🚀 Load and Display Sections with Stylish Loading & Smooth Scroll
document.addEventListener("DOMContentLoaded", function () {
    console.log("📌 DOM fully loaded.");

    const mainContent = document.getElementById('main-content');
    const loadingSpinner = document.getElementById('loading-spinner');
    const navLinks = document.querySelectorAll("a[data-section]"); // Nav links
    const mobileMenu = document.getElementById("hamburger-menu"); // Hamburger menu

    // ✅ Handle Navigation Clicks
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default link behavior

            const sectionFile = this.getAttribute("data-section-file");
            const sectionClass = this.getAttribute("data-section-class");

            if (sectionFile && sectionClass) {
                loadAndShowSection(sectionFile, sectionClass);
            }

            // ✅ Close mobile menu if open
            if (mobileMenu && mobileMenu.classList.contains("open")) {
                mobileMenu.classList.remove("open");
            }
        });
    });

    // ✅ Handle back/forward navigation
    window.addEventListener("popstate", function (event) {
        if (event.state) {
            loadAndShowSection(event.state.sectionFile, event.state.sectionClass, false);
        }
    });
});

// ✅ Load Section & Instantly Show It at Target
function loadAndShowSection(sectionFile, targetClass, addToHistory = true) {
    const mainContent = document.getElementById('main-content');
    const loadingSpinner = document.getElementById('loading-spinner');

    if (!sectionFile || !targetClass) {
        console.error("🚨 Invalid section data:", sectionFile, targetClass);
        return;
    }

    // Prevent reloading the same section
    if (mainContent.dataset.currentSection === sectionFile) {
        console.warn(`⚠️ Section '${sectionFile}' is already loaded. Skipping fetch.`);
        forceJumpToTarget(targetClass);
        return;
    }

    mainContent.dataset.currentSection = sectionFile; // Track current section

    if (addToHistory) {
        history.pushState({ sectionFile, targetClass }, '', `#${targetClass}`);
    }

    // Show spinner, hide content
    loadingSpinner.classList.remove('hidden');
    mainContent.classList.remove('show');
    mainContent.style.visibility = "hidden"; // Hide until fully loaded

    // ✅ Fetch new section
    fetch(`sections/${sectionFile}`)
        .then(response => {
            if (!response.ok) throw new Error(`❌ Failed to load ${sectionFile} (Status: ${response.status})`);
            return response.text();
        })
        .then(html => {
            mainContent.innerHTML = html;
            loadingSpinner.classList.add('hidden');

            // ✅ Instantly jump to section without showing scroll effect
            setTimeout(() => {
                forceJumpToTarget(targetClass);
                mainContent.style.visibility = "visible"; // Show content once loaded
            }, 100);
        })
        .catch(error => {
            console.error('❌ Error:', error);
            loadingSpinner.classList.add('hidden');
        });
}

// ✅ Instantly Jump to Target (No Scroll)
function forceJumpToTarget(targetClass) {
    let target = document.querySelector(`.${targetClass}`);

    if (target) {
        console.log(`🎯 Jumping instantly to: .${targetClass}`);
        window.scrollTo({ top: target.offsetTop, behavior: "instant" }); // No animation
    } else {
        console.warn(`⚠️ Target '.${targetClass}' not found.`);
    }
}



// 🚀 Smooth scrolling function
function scrollToSection(sectionClass) {
    const target = document.querySelector(`.${sectionClass}`);
    if (target) {
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    }
}





//NAVIGATION HANDLING (INCLUDING BACK/FORWARD NAVIGATION)
// **🚀 Handle Browser Back/Forward Navigation**
window.addEventListener('popstate', (event) => {
    console.log("🔄 Popstate triggered:", event);
    if (event.state && event.state.sectionFile && event.state.sectionClass) {
        console.log("🔄 Navigating back/forward to:", event.state);
        loadAndShowSection(event.state.sectionFile, event.state.sectionClass, false);
        if (event.state.sectionClass === 'home') {
            initializeHeroSlider(); // Re-initialize hero slider when navigating back to home
        }
    } else {
        console.warn("⚠️ No stored state found, reloading home section.");
        loadAndShowSection('home-section.html', 'home', false);
    }
});

// **🚀 Function to update the URL without reloading**
function updateURL(section) {
    const sectionFile = `${section}-section.html`;
    history.pushState({ sectionFile, sectionClass: section }, '', `#${section}`);
    console.log(`✅ Updated URL: #${section}`);
}

// **🚀 Handle back/forward navigation**
window.addEventListener("popstate", (event) => {
    const section = event.state?.section || "home";
    loadSection(section, false); // Don't update history again
});

// **🚀 Ensure navigation links & submenu items work correctly**
function setupNavigation() {
    const navLinks = document.querySelectorAll("nav a, .hamburger-dropdown a");
    const navbar = document.getElementById("navbar");
    const submenu = document.querySelector(".submenu"); // Adjust selector based on your structure

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent full-page reload

            const section = this.getAttribute("href").replace("#", ""); // Extract section name
            if (section) loadSection(section);

            // **✅ Auto-close Navigation Bar after clicking a link**
            if (navbar && navbar.classList.contains("open")) {
                navbar.classList.remove("open");
            }

            // **✅ Auto-close Submenu (if open)**
            if (submenu && submenu.classList.contains("open")) {
                submenu.classList.remove("open");
            }
        });
    });

    setupSubmenuToggle(); // Ensure submenu toggle works properly
}

// **🚀 Auto-hide submenu when the cursor leaves it**
function setupSubmenuAutoHide() {
    const submenuContainer = document.querySelector(".submenu-container"); // Adjust this to your submenu wrapper

    if (submenuContainer) {
        submenuContainer.addEventListener("mouseleave", () => {
            const submenu = document.querySelector(".submenu");
            if (submenu) submenu.classList.remove("open"); // Hide submenu when cursor leaves
        });
    }
}

// **🚀 Load section based on URL hash on page load (without forcing home)**
document.addEventListener("DOMContentLoaded", () => {
    const section = window.location.hash.substring(1) || "home"; // Default to home if no hash
    setupNavigation(); // Ensure nav links & submenu work
    setupSubmenuAutoHide(); // Enable auto-hide for submenu
    loadSection(section); // Load the correct section
});




//HAMBURGER MENU HANDLING
// 🚀 Function to toggle the Hamburger Menu
function toggleHamburgerMenu(event) {
    event.stopPropagation(); // Prevent click from bubbling up
    let menu = document.getElementById("hamburger-dropdown");
    menu.classList.toggle("show");
}

// 🚀 Function to close Hamburger Menu
function closeHamburgerMenu() {
    let menu = document.getElementById("hamburger-dropdown");
    if (menu) menu.classList.remove("show");
}

// 🚀 Function to close ALL menus (hamburger + submenus)
function closeAllMenus() {
    let hamburgerDropdown = document.getElementById("hamburger-dropdown");
    let submenus = document.querySelectorAll(".submenu");

    // Hide hamburger menu
    hamburgerDropdown.classList.remove("show");

    // Hide all submenus
    submenus.forEach((submenu) => {
        submenu.classList.remove("show");
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

// Attach hamburger menu event listeners
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".hamburger-menu").addEventListener("click", toggleHamburgerMenu);
    document.addEventListener("click", function (event) {
        // Close everything if clicking outside of menu
        if (!event.target.closest(".hamburger-menu, .navbar, .submenu")) {
            closeAllMenus();
        }
    });

    closeSubMenuOnClick(); // Ensure menus close on item click
});





//3. SUBMENU HANDLING
// 🚀 Function to toggle submenus on click
function setupSubmenuToggle() {
    document.querySelectorAll(".has-submenu > a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent page reload

            let submenu = this.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle("show");
            }
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

    setupSubmenuToggle(); // Ensure submenus toggle properly
});

