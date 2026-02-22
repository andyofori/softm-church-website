// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navbar scroll state
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar && navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' });
    });
});

// Active nav on scroll
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top <= 100 && top + section.clientHeight > 100) current = section.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
});

// Scroll-reveal
document.addEventListener('DOMContentLoaded', () => {
    const revealEls = document.querySelectorAll('.service-card, .ministry-card, .event-card, .gallery-item, .about-text, .about-image, .contact-item, .section-header');
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const delay = Math.min(siblings.indexOf(entry.target) * 80, 400);
                    setTimeout(() => entry.target.classList.add('visible'), delay);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => { el.classList.add('reveal'); obs.observe(el); });
    } else {
        revealEls.forEach(el => el.classList.add('visible'));
    }
});

// Lightbox
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    if (!lightbox) return;
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery-img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    const close = () => { lightbox.classList.remove('open'); document.body.style.overflow = ''; };
    if (lightboxClose) lightboxClose.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});

// Contact form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();
        if (!name || !email || !message) return alert('Please fill in all fields.');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Please enter a valid email address.');
        const btn = this.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML = 'Sending… <i class="fas fa-circle-notch fa-spin"></i>';
        btn.disabled = true;
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon. \uD83D\uDE4F');
            form.reset();
            btn.innerHTML = orig;
            btn.disabled = false;
        }, 1800);
    });
});

// Scroll-to-top
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    btn.className = 'scroll-to-top';
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.pageYOffset > 400));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
