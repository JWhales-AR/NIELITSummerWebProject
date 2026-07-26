const header = document.getElementById("header");
const goToTopButton = document.getElementById("go-to-top-button");

function windowOnScroll() {
    requestAnimationFrame(() => {
        fixHeaderAndGoToTopButton();
        progressBarUpdate();
    })
}

window.addEventListener("scroll", windowOnScroll, { passive: true });

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


const menuButton = document.getElementById("header-menu-button");
menuButton.addEventListener("click", () => {
    menuButton.querySelector(".hamburger-icon").classList.toggle("cross");
    const menu = document.getElementById("header-menu");
    menu.classList.toggle("closed");
})


const cards = document.querySelectorAll(".card-stack--card");
const onWideScreen = matchMedia("(min-width: 800px)");
if (onWideScreen.matches) {
    cards.forEach(card => card.classList.remove("reveal-animated"));
}
