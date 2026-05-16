// =======================
// VIDEO INITIALIZATION
// =======================

// Initialize first video as active
document.addEventListener("DOMContentLoaded", () => {
    const firstVideo = document.getElementById("bgVideo1");
    if (firstVideo) {
        firstVideo.classList.add("active");
        // Ensure video is muted and can autoplay
        firstVideo.muted = true;
        firstVideo.play().catch(e => console.log("Video autoplay failed:", e));
    }

    // Add error handling for videos
    const videos = document.querySelectorAll('.bg-video');
    videos.forEach(video => {
        video.addEventListener('error', (e) => {
            console.log('Video failed to load:', e.target.src);
        });
    });
});

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if(window.scrollY > 50){
        navbar.style.background = "rgba(5,15,35,.92)";
        navbar.style.backdropFilter = "blur(20px)";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";
        navbar.style.padding = "15px 8%";
    }
    else{
        navbar.style.background = "rgba(255,255,255,.05)";
        navbar.style.boxShadow = "none";
        navbar.style.padding = "20px 8%";
    }
});

// =======================
// SCROLL REVEAL
// =======================

const reveals = document.querySelectorAll(".reveal");

function revealSections(){
    reveals.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if(sectionTop < screenHeight - 120){
            section.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);
revealSections();

// =======================
// COUNTER ANIMATION
// =======================

const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function startCounter(){
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = target / 100;

        function updateCounter(){
            count += increment;

            if(count < target){
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCounter);
            }
            else{
                if(target === 95){
                    counter.innerText = "95%";
                }
                else if(target === 350){
                    counter.innerText = "3.5x";
                }
                else if(target === 60){
                    counter.innerText = "60%";
                }
                else{
                    counter.innerText = target;
                }
            }
        }

        updateCounter();
    });
}

// RUN COUNTER ON SCROLL
window.addEventListener("scroll", () => {
    const trustSection = document.querySelector(".trust");
    if(trustSection){
        const sectionTop = trustSection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 100;

        if(sectionTop < triggerPoint && !counterStarted){
            startCounter();
            counterStarted = true;
        }
    }
});

// =======================
// HERO TEXT ANIMATION
// =======================

window.addEventListener("load", () => {
    const heroTitle = document.querySelector(".hero-title");
    const heroText = document.querySelector(".hero-text");
    const heroButtons = document.querySelector(".hero-buttons");

    if(heroTitle){
        heroTitle.style.opacity = "0";
        setTimeout(() => {
            heroTitle.style.transition = "1s ease";
            heroTitle.style.opacity = "1";
            heroTitle.style.transform = "translateY(0)";
        }, 300);
    }

    if(heroText){
        heroText.style.opacity = "0";
        setTimeout(() => {
            heroText.style.transition = "1s ease";
            heroText.style.opacity = "1";
        }, 700);
    }

    if(heroButtons){
        heroButtons.style.opacity = "0";
        setTimeout(() => {
            heroButtons.style.transition = "1s ease";
            heroButtons.style.opacity = "1";
        }, 1000);
    }
});

// =======================
// SMOOTH HOVER GLOW
// =======================

const cards = document.querySelectorAll(`
.card,
.service-card,
.portfolio-card,
.package-card,
.stat-box,
.trust-box,
.template-card,
.benefit-card,
.team-member,
.faq-item,
.solution-card
`);

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(77,166,255,.12), rgba(255,255,255,.06))`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.background = "rgba(255,255,255,.06)";
    });
});

// =======================
// BUTTON MAGNET EFFECT
// =======================

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
    button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px) scale(1.05)`;
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0,0)";
    });
});

// =======================
// SMOOTH PAGE FADE-IN
// =======================

document.body.style.opacity = "0";

window.addEventListener("load", () => {
    document.body.style.transition = "opacity 1s ease";
    document.body.style.opacity = "1";
});

// =======================
// SMOOTH VIDEO BACKGROUND TRANSITIONS
// =======================

const bgVideos = [
    document.getElementById("bgVideo1"),
    document.getElementById("bgVideo2"),
    document.getElementById("bgVideo3"),
    document.getElementById("bgVideo4"),
    document.getElementById("bgVideo5")
].filter(Boolean); // filter nulls for pages that only have 3 videos

let currentVideoIndex = 0;

function switchToVideo(newIndex) {
    if (!bgVideos[newIndex]) return;
    if (newIndex === currentVideoIndex) return;

    bgVideos.forEach((video, index) => {
        if (index === newIndex) {
            video.classList.add("active");
            video.muted = true;
            video.play().catch(e => {});
        } else {
            video.classList.remove("active");
        }
    });

    currentVideoIndex = newIndex;
}

function getScrollVideoIndex() {
    if (bgVideos.length <= 1) return 0;

    const scrollTop = Math.max(
        document.documentElement.scrollTop,
        document.body.scrollTop,
        window.pageYOffset
    );

    const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
    ) - window.innerHeight;

    if (scrollHeight <= 0) return 0;

    const scrollRatio = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);

    if (bgVideos.length === 3) {
        if (scrollRatio < 1 / 3) return 0;
        if (scrollRatio < 2 / 3) return 1;
        return 2;
    }

    return Math.min(bgVideos.length - 1, Math.floor(scrollRatio * bgVideos.length));
}

function syncVideosOnScroll() {
    const newVideoIndex = getScrollVideoIndex();
    console.log("scroll video index:", newVideoIndex, "active video:", bgVideos[newVideoIndex]?.id);
    switchToVideo(newVideoIndex);
}

function initScrollVideoSync() {
    syncVideosOnScroll();
    window.addEventListener("scroll", syncVideosOnScroll);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollVideoSync);
} else {
    initScrollVideoSync();
}

// On portfolio page: sync each template card hover/scroll to its matching video
const templateCards = document.querySelectorAll(".template-card");
if (templateCards.length > 0 && bgVideos.length >= 5) {
    // Hover: instantly preview that template's video
    templateCards.forEach((card, i) => {
        card.addEventListener("mouseenter", () => switchToVideo(i));
    });

    // Scroll: switch video when a template card enters the centre of viewport
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = Array.from(templateCards).indexOf(entry.target);
                if (idx !== -1) switchToVideo(idx);
            }
        });
    }, { threshold: 0.5 });

    templateCards.forEach(card => cardObserver.observe(card));
}
// Subtle playback rate effect on scroll
window.addEventListener("scroll", () => {
    const scrollRatio = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight || 1);
    const rate = Math.min(0.8 + scrollRatio * 0.4, 1.2);
    bgVideos.forEach(v => { if (v) v.playbackRate = rate; });
});

// =======================
// FORM HANDLING
// =======================

const contactForm = document.querySelector(".contact-form");

if(contactForm){
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Store data in localStorage
        localStorage.setItem("contactFormData", JSON.stringify(data));

        // Show success message
        alert("Thank you for reaching out! We'll respond within 24 hours.");
        contactForm.reset();
    });
}

// =======================
// SMOOTH SCROLL ANCHORS
// =======================

const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        if(targetId === "#") return;

        const target = document.querySelector(targetId);
        if(target){
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// =======================
// LAZY LOAD IMAGES
// =======================

if("IntersectionObserver" in window){
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                const img = entry.target;
                img.style.opacity = "0";
                img.onload = () => {
                    img.style.transition = "opacity 0.5s ease";
                    img.style.opacity = "1";
                };
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll(".premium-image, .section-image img").forEach(img => {
        imageObserver.observe(img);
    });
}

// =======================
// PREMIUM PLAYFUL EFFECTS
// =======================

// SCROLL BAR

window.addEventListener(
"scroll",
()=>{

    const scrollTop =
    window.scrollY;

    const docHeight =
    document.documentElement.scrollHeight
    - window.innerHeight;

    if (docHeight <= 0) return;

    const scrollPercent =
    (scrollTop / docHeight)
    * 100;

    const progressBar = document.querySelector(
    ".progress-bar"
    );

    if (progressBar) {
        progressBar.style.width =
        scrollPercent + "%";
    }
});

// PARALLAX HERO

document.addEventListener(
"mousemove",
(e)=>{

    const hero =
    document.querySelector(
    ".hero-left"
    );

    if(hero){

        const x =
        (window.innerWidth/2
        - e.pageX)/50;

        const y =
        (window.innerHeight/2
        - e.pageY)/50;

        hero.style.transform =
        `translate(${x}px,
        ${y}px)`;
    }
});

// STAGGER ANIMATION

const observer =
new IntersectionObserver(
(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity =
"1";

entry.target.style.transform =
"translateY(0)";
}
});
},
{
threshold:.15
});

document.querySelectorAll(
".cert-box,.compliance-item,.stat"
)
.forEach((el,index)=>{

el.style.opacity = "0";

el.style.transform =
"translateY(50px)";

el.style.transition =
`${0.7 + index * .15}s`;

observer.observe(el);
});

// (reveal scroll already handled above)