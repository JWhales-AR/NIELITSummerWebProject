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

document.querySelectorAll(".reveal-animated").forEach(node =>
    observer.observe(node)
);
