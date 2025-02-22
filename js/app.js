// 🚀 Function to update meta tags dynamically
function updateMetaTags(title, description) {
    document.title = title;
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
        metaDescription.setAttribute("content", description);
    }
}



// ✅ Function to Load Section CSS
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


// 🚀 Function to load section-specific JS
// 🚀 Function to Load Section-Specific JS (Alternative Fix)
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


// 🚀 Function to load a section dynamically
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


// 🚀 Function to update the URL without reloading
function updateURL(section) {
    history.pushState({ section }, "", `#${section}`);
}

// 🚀 Handle back/forward navigation
window.addEventListener("popstate", (event) => {
    const section = event.state?.section || "home";
    loadSection(section, false); // Don't update history again
});

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

// 🚀 Ensure navigation links work correctly
function setupNavigation() {
    document.querySelectorAll("nav a, .hamburger-dropdown a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent full-page reload

            const section = this.getAttribute("href").replace("#", ""); // Extract section name
            if (section) loadSection(section);
        });
    });

    // Close menus when clicking outside
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".hamburger-menu, .navbar, .submenu")) {
            closeAllMenus();
        }
    });

    setupSubmenuToggle(); // Ensure submenus work
}

// 🚀 Load section based on URL hash on page load **without forcing home**
document.addEventListener("DOMContentLoaded", () => {
    const section = window.location.hash.substring(1) || "home"; // Default to home if no hash
    setupNavigation(); // Ensure nav links work
    loadSection(section); // Load the correct section
});
