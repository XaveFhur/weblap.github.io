//Navbar reszponzivitás

function myFunction() {
    const x = document.getElementById("myNavbar");
    const navLinks = x.querySelector(".nav-links");

    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}

// Kártya animáció

document.addEventListener('DOMContentLoaded', () => {
    // Létrehozunk egy Intersection Observert
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    });
    const fadeElements = document.querySelectorAll('.anim');
    // Csatlakoztatjuk az observert minden ilyen elemhez
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});