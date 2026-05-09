// NAVBAR SCROLL EFFECT

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.style.background =
            "rgba(10,10,10,0.85)";
        navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.3)";
        navbar.style.padding =
            "15px 8%";
    } else {
        navbar.style.background =
            "rgba(0,0,0,0.2)";
        navbar.style.boxShadow =
            "none";
        navbar.style.padding =
            "20px 8%";
    }
});


// SCROLL REVEAL ANIMATION

const reveals =
document.querySelectorAll(".reveal");

function revealSections() {

    reveals.forEach((section) => {

        const sectionTop =
        section.getBoundingClientRect().top;

        const screenHeight =
        window.innerHeight;

        if (sectionTop <
            screenHeight - 150) {

            section.classList.add("active");
        }
    });
}

window.addEventListener(
    "scroll",
    revealSections
);

revealSections();


// COUNTER ANIMATION

const counters =
document.querySelectorAll(".counter");

const startCounter = () => {

    counters.forEach(counter => {

        const target =
        +counter.getAttribute(
            "data-target"
        );

        let count = 0;

        const increment =
        target / 100;

        const updateCounter = () => {

            count += increment;

            if (count < target) {

                counter.innerText =
                Math.ceil(count);

                setTimeout(
                    updateCounter,
                    20
                );

            } else {

                counter.innerText =
                target;

                // add "+" for stats
                if(target === 95){
                    counter.innerText =
                    target + "%";
                }

                if(target === 350){
                    counter.innerText =
                    "3.5x";
                }

                if(target === 60){
                    counter.innerText =
                    target + "%";
                }

                if(target === 8){
                    counter.innerText =
                    target + " Weeks";
                }
            }
        };

        updateCounter();
    });
};


// RUN COUNTER ON SCROLL

let counterStarted = false;

window.addEventListener(
    "scroll",
    () => {

        const whySection =
        document.querySelector(
            ".why-us"
        );

        const position =
        whySection.getBoundingClientRect()
        .top;

        const screenPosition =
        window.innerHeight - 200;

        if (
            position < screenPosition &&
            !counterStarted
        ) {
            startCounter();
            counterStarted = true;
        }
    }
);


// SMOOTH BUTTON HOVER EFFECT

const buttons =
document.querySelectorAll(
    ".btn"
);

buttons.forEach(button => {

    button.addEventListener(
        "mouseenter",
        () => {

            button.style.transform =
            "translateY(-5px) scale(1.03)";
        }
    );

    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
            "translateY(0) scale(1)";
        }
    );
});


// PAGE LOAD ANIMATION

window.addEventListener(
    "load",
    () => {

        document.body.style.opacity =
        "1";

        document.body.style.transition =
        "opacity 1s ease";
    }
);