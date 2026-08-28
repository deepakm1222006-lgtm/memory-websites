// =====================================================
// 🌱 ILakiyaa's LITTLE WORLD - MAIN JS
// =====================================================

console.log("🌱 Main JS loaded!");


// =====================================================
// DAILY MOTIVATION
// =====================================================

const quotes = [

    "Small progress is still progress.",

    "You don't have to be perfect. Just keep going.",

    "One good day can start with one small step.",

    "Learn something new today.",

    "Your future self will thank you for today's effort.",

    "Take a break when you need one. Then continue.",

    "Try. Learn. Improve. Repeat.",

    "A new place can create new memories.",

    "Don't compare your chapter with someone else's.",

    "Keep moving forward. 🚀",

    "Make today a little better than yesterday.",

    "You are allowed to start small."

];


const quoteElement =
    document.getElementById("dailyQuote");


const quoteButton =
    document.getElementById("newQuote");


if (quoteButton && quoteElement) {

    quoteButton.addEventListener(
        "click",
        function () {

            const randomIndex =
                Math.floor(
                    Math.random() *
                    quotes.length
                );

            quoteElement.textContent =
                quotes[randomIndex];

        }
    );

}


// =====================================================
// NAVBAR SCROLL EFFECT
// =====================================================

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    function () {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }
);


// =====================================================
// SIMPLE PAGE FADE-IN
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        document.body.classList.add(
            "page-loaded"
        );

    }
);

// ============================================
// 🌙 DARK MODE
// ============================================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    function updateThemeButton() {

        if (document.body.classList.contains("dark-mode")) {

            themeToggle.textContent = "☀️";

        } else {

            themeToggle.textContent = "🌙";

        }

    }


    // Load saved theme
    const savedTheme = localStorage.getItem("theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }


    updateThemeButton();


    // Toggle theme
    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");


        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

        } else {

            localStorage.setItem("theme", "light");

        }


        updateThemeButton();

    });

}
// ============================================
// 🌐 ACTIVE NAVIGATION
// ============================================

const currentPage =
    window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

const navLinks =
    document.querySelectorAll(".navbar nav a");

navLinks.forEach(function (link) {

    const linkPage =
        link.getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

    if (linkPage === currentPage) {

        link.classList.add("active");

    }

});

// ============================================
// ✨ PAGE LOADING EFFECT
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        document.body.classList.add(
            "page-loaded"
        );

    }
);
