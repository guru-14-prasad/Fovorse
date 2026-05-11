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
    document.getElementById("bgVideo3")
];

let currentVideoIndex = 0;

window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    let currentSectionIndex = 0;

    // Find which section is currently most visible
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Check if section is in viewport (with some tolerance)
        if (sectionTop <= windowHeight / 2 && sectionTop + sectionHeight >= windowHeight / 2) {
            currentSectionIndex = index;
        }
    });

    // Map sections to videos (distribute across available videos)
    let newVideoIndex;
    const totalSections = sections.length;

    if (currentSectionIndex < totalSections / 3) {
        newVideoIndex = 0; // First third of sections: bg-video.mp4
    } else if (currentSectionIndex < (totalSections / 3) * 2) {
        newVideoIndex = 1; // Second third of sections: bg-video-2.mp4
    } else {
        newVideoIndex = 2; // Last third of sections: bg-video-3.mp4
    }

    // Switch video if needed
    if (newVideoIndex !== currentVideoIndex) {
        // Pause current video to save resources
        bgVideos[currentVideoIndex].pause();

        // Remove active class from current video
        bgVideos[currentVideoIndex].classList.remove("active");

        // Add active class to new video
        bgVideos[newVideoIndex].classList.add("active");

        // Ensure new video is playing
        if (bgVideos[newVideoIndex].paused) {
            bgVideos[newVideoIndex].play().catch(e => console.log("Video play failed:", e));
        }

        // Update current index
        currentVideoIndex = newVideoIndex;
    }

    // Optional: Adjust playback rate for subtle effect
    const playbackRate = 0.8 + (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 0.4; // Rate between 0.8 and 1.2
    bgVideos.forEach(video => {
        if (video) {
            video.playbackRate = Math.min(playbackRate, 1.2);
        }
    });
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