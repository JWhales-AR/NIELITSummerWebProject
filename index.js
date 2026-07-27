const svgThemeToDark = `<svg class="button-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>`;
const svgThemeToLight = `<svg class="button-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm141.5-310.5Q680-397 680-480t-58.5-141.5Q563-680 480-680t-141.5 58.5Q280-563 280-480t58.5 141.5Q397-280 480-280t141.5-58.5ZM480-480Zm0 340 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/></svg>`;

const header = document.getElementById("header");
const goToTopButton = document.getElementById("go-to-top-button");
const themeToggleButton = document.getElementById("header-theme-button");

window.addEventListener("scroll", windowOnScroll, { passive: true });
function windowOnScroll() {
    requestAnimationFrame(() => {
        fixHeaderAndGoToTopButton();
        progressBarUpdate();
    })
}

goToTopButton.addEventListener("click", () => window.scrollTo(0, 0));
function fixHeaderAndGoToTopButton() {
    if (window.scrollY > 20) {
        header.classList.add("scrolled");
        goToTopButton.classList.remove("hidden");
    } else {
        header.classList.remove("scrolled");
        goToTopButton.classList.add("hidden");
    }
}

const progressBar = document.getElementById("progress-bar");
const progressBarFill = progressBar.querySelector(".progress-bar--fill");
function progressBarUpdate() {
    let max =
        document.documentElement.scrollHeight
        - document.documentElement.clientHeight;
    let current = window.scrollY;
    let fillPercent = (current / max) * 100;
    progressBarFill.style.width = `${fillPercent}%`;
}

themeToggleButton.addEventListener("click", toggleTheme);
function toggleTheme() {
    const rootElement = document.documentElement;
    if (rootElement.classList.contains("light")) {
        themeToggleButton.innerHTML = svgThemeToLight;
        rootElement.classList.remove("light");
    } else {
        themeToggleButton.innerHTML = svgThemeToDark;
        rootElement.classList.add("light");
    }
}

const menuButton = document.getElementById("header-menu-button");
menuButton.addEventListener("click", () => {
    menuButton.querySelector(".hamburger-icon").classList.toggle("cross");
    const menu = document.getElementById("header-menu");
    menu.classList.toggle("closed");
})


const observer = new IntersectionObserver(entries => {
    entries.forEach(revealOnScroll);
})

function revealOnScroll(entry) {
    if (entry.isIntersecting) {
        entry.target.classList.add("-revealed");
    } else {
        entry.target.classList.remove("-revealed");
    }
}

const prefersReducedAnimation = matchMedia("(prefers-reduced-motion: reduce)");
document.querySelectorAll(".reveal-animated").forEach(node => {
    if (!prefersReducedAnimation.matches) {
        node.setAttribute("data-extra-animations", true);
        observer.observe(node);
    }
});
document.querySelectorAll(".infinite-scroller").forEach(node => {
    if (!prefersReducedAnimation.matches) {
        infiniteScrollAnimation(node);
    }
})

function infiniteScrollAnimation(scroller) {
    scroller.setAttribute("data-extra-animations", true);
    let scrollerInner = scroller.querySelector(".scroller__inner");
    Array.from(scrollerInner.children).forEach(child => {
        let duplicated = child.cloneNode(true);
        duplicated.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicated);
    });
}


const cards = document.querySelectorAll(".card-stack--card");
const onWideScreen = matchMedia("(min-width: 800px)");
if (onWideScreen.matches) {
    cards.forEach(card => card.classList.remove("reveal-animated"));
}


const typewriterTextItems = document.querySelectorAll(".typewriter-text");
requestAnimationFrame(() => typewriterTextItems.forEach(typewriterAnimation));

async function typewriterAnimation(textItem) {
    const textList = JSON.parse(textItem.dataset.textList);
    while (true) {
        for (const text of textList) {
            const n = text.length;
            for (const c of text) {
                textItem.textContent += c;
                await sleep(100);
            }
            await sleep(1 * 1000);
            for (let i = n - 1; i >= 0; --i) {
                textItem.textContent = text.slice(0, i);
                await sleep(50);
            }
        }
        await sleep(100);
    }
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}
