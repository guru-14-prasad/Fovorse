// =======================
// NAVBAR SCROLL EFFECT
// =======================

const navbar =
document.querySelector(".navbar");

window.addEventListener(
    "scroll",
    () => {

        if(window.scrollY > 50){

            navbar.style.background =
            "rgba(5,15,35,.92)";

            navbar.style.backdropFilter =
            "blur(20px)";

            navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.35)";

            navbar.style.padding =
            "15px 8%";

        }

        else{

            navbar.style.background =
            "rgba(255,255,255,.05)";

            navbar.style.boxShadow =
            "none";

            navbar.style.padding =
            "20px 8%";
        }
    }
);


// =======================
// SCROLL REVEAL
// =======================

const reveals =
document.querySelectorAll(".reveal");

function revealSections(){

    reveals.forEach((section)=>{

        const sectionTop =
        section.getBoundingClientRect().top;

        const screenHeight =
        window.innerHeight;

        if(
            sectionTop <
            screenHeight - 120
        ){
            section.classList.add(
                "active"
            );
        }
    });
}

window.addEventListener(
    "scroll",
    revealSections
);

revealSections();


// =======================
// COUNTER ANIMATION
// =======================

const counters =
document.querySelectorAll(
    ".counter"
);

let counterStarted =
false;

function startCounter(){

    counters.forEach(counter => {

        const target =
        +counter.getAttribute(
            "data-target"
        );

        let count = 0;

        const increment =
        target / 100;

        function updateCounter(){

            count += increment;

            if(count < target){

                counter.innerText =
                Math.ceil(count);

                requestAnimationFrame(
                    updateCounter
                );

            }

            else{

                // FINAL VALUES

                if(target === 95){
                    counter.innerText =
                    "95%";
                }

                else if(
                    target === 350
                ){
                    counter.innerText =
                    "3.5x";
                }

                else if(
                    target === 60
                ){
                    counter.innerText =
                    "60%";
                }

                else{
                    counter.innerText =
                    target;
                }
            }
        }

        updateCounter();
    });
}


// RUN COUNTER ON SCROLL

window.addEventListener(
    "scroll",
    ()=>{

        const whySection =
        document.querySelector(
            ".why-us"
        );

        const sectionTop =
        whySection
        .getBoundingClientRect()
        .top;

        const triggerPoint =
        window.innerHeight - 100;

        if(
            sectionTop <
            triggerPoint &&
            !counterStarted
        ){

            startCounter();

            counterStarted =
            true;
        }
    }
);


// =======================
// HERO TEXT ANIMATION
// =======================

window.addEventListener(
    "load",
    ()=>{

        const heroTitle =
        document.querySelector(
            ".hero-title"
        );

        const heroText =
        document.querySelector(
            ".hero-text"
        );

        const heroButtons =
        document.querySelector(
            ".hero-buttons"
        );

        heroTitle.style.opacity =
        "0";

        heroText.style.opacity =
        "0";

        heroButtons.style.opacity =
        "0";

        setTimeout(()=>{

            heroTitle.style.transition =
            "1s ease";

            heroTitle.style.opacity =
            "1";

            heroTitle.style.transform =
            "translateY(0)";

        },300);

        setTimeout(()=>{

            heroText.style.transition =
            "1s ease";

            heroText.style.opacity =
            "1";

        },700);

        setTimeout(()=>{

            heroButtons.style.transition =
            "1s ease";

            heroButtons.style.opacity =
            "1";

        },1000);

    }
);


// =======================
// SMOOTH HOVER GLOW
// =======================

const cards =
document.querySelectorAll(
`
.card,
.service-card,
.portfolio-card,
.package-card,
.stat-box
`
);

cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        (e)=>{

            const rect =
            card.getBoundingClientRect();

            const x =
            e.clientX - rect.left;

            const y =
            e.clientY - rect.top;

            card.style.background =
            `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(77,166,255,.12),
                rgba(255,255,255,.06)
            )
            `;
        }
    );

    card.addEventListener(
        "mouseleave",
        ()=>{

            card.style.background =
            "rgba(255,255,255,.06)";
        }
    );
});



// =======================
// BUTTON MAGNET EFFECT
// =======================

const buttons =
document.querySelectorAll(
    ".btn"
);

buttons.forEach(button=>{

    button.addEventListener(
        "mousemove",
        (e)=>{

            const rect =
            button.getBoundingClientRect();

            const x =
            e.clientX - rect.left
            - rect.width / 2;

            const y =
            e.clientY - rect.top
            - rect.height / 2;

            button.style.transform =
            `
            translate(
                ${x * 0.12}px,
                ${y * 0.12}px
            )
            scale(1.05)
            `;
        }
    );

    button.addEventListener(
        "mouseleave",
        ()=>{

            button.style.transform =
            "translate(0,0)";
        }
    );
});


// =======================
// SMOOTH PAGE FADE-IN
// =======================

document.body.style.opacity =
"0";

window.addEventListener(
    "load",
    ()=>{

        document.body.style.transition =
        "opacity 1s ease";

        document.body.style.opacity =
        "1";
    }
);