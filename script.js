/* =================================
   ELEMENTS
================================= */

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const lastButton = document.getElementById("lastButton");
const letter = document.getElementById("letter");


/* =================================
   MUSIC
================================= */

let musicStarted = false;


function startMusic() {

    if (musicStarted) {
        return;
    }

    music.play()
        .then(() => {

            musicStarted = true;

            musicBtn.classList.remove("paused");

        })
        .catch(() => {

            console.log("Music is waiting for interaction.");

        });

}


/*
   Browsers don't allow reliable
   autoplay with sound.

   So the first touch/click
   starts the music.
*/

document.addEventListener(
    "pointerdown",
    startMusic,
    {
        once: true
    }
);


/* =================================
   MUSIC BUTTON
================================= */

musicBtn.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();

        if (music.paused) {

            music.play();

            musicBtn.classList.remove("paused");

        } else {

            music.pause();

            musicBtn.classList.add("paused");

        }

    }
);


/* =================================
   SCROLL REVEAL
================================= */

const reveals =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(
                function(entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );


reveals.forEach(
    function(element) {

        revealObserver.observe(element);

    }
);


/* =================================
   HERO INTRO
================================= */

window.addEventListener(
    "load",
    function() {

        const heroElements =
            document.querySelectorAll(
                ".hero-reveal"
            );


        heroElements.forEach(
            function(element, index) {

                setTimeout(
                    function() {

                        element.classList.add(
                            "visible"
                        );

                    },
                    400 + index * 350
                );

            }
        );

    }
);


/* =================================
   LAST BUTTON
================================= */

lastButton.addEventListener(
    "click",
    function() {

        letter.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =================================
   WEDDING IMAGE PARALLAX
================================= */

const weddingImage =
    document.querySelector(
        ".wedding-image"
    );


window.addEventListener(
    "scroll",
    function() {

        if (!weddingImage) {
            return;
        }


        const rect =
            weddingImage.getBoundingClientRect();


        const windowHeight =
            window.innerHeight;


        if (
            rect.top < windowHeight &&
            rect.bottom > 0
        ) {

            const progress =
                (windowHeight - rect.top) /
                (windowHeight + rect.height);


            const movement =
                (progress - 0.5) * 20;


            weddingImage.style.transform =
                `translateY(${movement}px)`;

        }

    },
    {
        passive: true
    }
);


/* =================================
   PREVENT BROKEN IMAGE
================================= */

const weddingImg =
    document.querySelector(
        ".wedding-image img"
    );


weddingImg.addEventListener(
    "error",
    function() {

        console.log(
            "Make sure wedding.jpg is in the same folder as index.html."
        );

    }
);