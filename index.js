window.addEventListener("scroll", () => {
    headerOpacityOnScroll();
})

function headerOpacityOnScroll() {
    const header = document.getElementById("header");

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
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
    if (!prefersReducedAnimation.match) {
        node.setAttribute("data-extra-animations", true);
        observer.observe(node);
    }
});


const menuButton = document.getElementById("header-menu-button");
menuButton.addEventListener("click", () => {
    const menu = document.getElementById("header-menu");
    menu.classList.toggle("closed");
})
