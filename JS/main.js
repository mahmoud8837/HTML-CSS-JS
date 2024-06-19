let landingPage = document.querySelector(".landing-page");
landingPage.style.backgroundImage = "url(/imgs/landing1.jpg)";
let backgroundImages = ["landing1.jpg", "landing2.jpg", "landing3.jpg", "landing4.jpg", "landing5.jpg"];
let backgroundImageIndex = 0;
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
let backgroundOption = true;
let backgroundInterval;


// Settings Box
let settingsBox = document.querySelector(".settings-box");
let settingsBoxIcon = document.querySelector(".settings-box i");
settingsBoxIcon.onclick = function () {
    settingsBox.classList.toggle("open");
    settingsBoxIcon.classList.toggle("fa-spin");
}

// Switch Colors
const colorLi = document.querySelectorAll(".colors-list li");

if (localStorage.getItem("color_option")) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));
    colorLi.forEach(li => {
        if (li.dataset.color == localStorage.getItem("color_option")) {
            colorLi.forEach(li => {
                li.classList.remove("active")
            })
            li.classList.add("active")
        }
    })
}
if (localStorage.getItem("background_option")) {
    if (localStorage.getItem("background_option") === "true") {
        backgroundOption = true;
        switchingBackground();
    } else if (JSON.parse(localStorage.getItem("background_option"))[0] == false){
        backgroundOption = false;
        switchingBackground();
        landingPage.style.backgroundImage = JSON.parse(localStorage.getItem("background_option"))[1];
        randomBackEl.forEach(span => {
            if (span.dataset.background == "no") {
                randomBackEl.forEach(span => {
                    span.classList.remove("active")
                })
                span.classList.add("active")
            }
        })
    }
}
if (localStorage.getItem("bullets")) {
    if (localStorage.getItem("bullets") === "show") {
        document.querySelector(".nav-bullets").style.display = "block"
    } else {
        document.querySelector(".nav-bullets").style.display = "none";
        document.querySelectorAll(".bullets-option span").forEach(span => {
            if (span.dataset.display == "hide") {
                span.classList.add("active")
            } else {
                span.classList.remove("active")
            }

        })
    }
}

colorLi.forEach(li => {
    li.onclick = function (e) {
        handleActive(e)
        document.documentElement.style.setProperty("--main-color", li.dataset.color);
        localStorage.setItem("color_option", li.dataset.color)
    }
})


// Switch Random Background Option

randomBackEl.forEach(span => {
    span.onclick = function (e) {
        handleActive(e)
        if (span.dataset.background === "yes") {
            backgroundOption = true;
            switchingBackground();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            switchingBackground();
            localStorage.setItem("background_option", JSON.stringify([false, landingPage.style.backgroundImage]));
        }
    }
})

// Background Image

function switchingBackground() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            backgroundImageIndex === backgroundImages.length ? backgroundImageIndex = 0 : backgroundImageIndex
            landingPage.style.backgroundImage = `url(/imgs/${backgroundImages[backgroundImageIndex]})`;
            backgroundImageIndex++
        }, 10000)        
    } else {
        clearInterval(backgroundInterval);
    }
}

let aboutUs = document.querySelector(".about-us");
let aboutUsOffsetTop = aboutUs.offsetTop;
let gallery = document.querySelector(".gallery");
let galleryOffsetTop = gallery.offsetTop;

// Skills
let ourSkills = document.querySelector(".skills");

window.onscroll = function() {
    let SkillsOffsetTop = ourSkills.offsetTop;
    if (window.scrollY >= SkillsOffsetTop - 400) {
        document.querySelectorAll(".skills .skill-progress span").forEach((span) => {
            ourSkills.style.cssText = "opacity: 1; filter: blur(0)"
            span.style.width = span.dataset.progress
        })
    }

}

// Creater Popup With Image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
    img.addEventListener("click", (e) => {
        // Create Overlay
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        let popupImg = document.createElement("img");
        popupImg.src = img.src
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);

        if (img.alt != null) {
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.prepend(imgHeading)
        }

        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.className = "close-button"
        closeButton.appendChild(closeButtonText);
        popupBox.appendChild(closeButton);
    })
})

document.addEventListener("click", (e) => {
    if (e.target.className === "close-button") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove()
    }
})

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach(bullet => {
    bullet.addEventListener("click", (e) => {
        document.querySelector(`${bullet.dataset.section}`).scrollIntoView({
            behavior: "smooth"
        })
    })
})

// Handle Active State
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(e => {
        e.classList.remove("active")
    })
    ev.target.classList.add("active")
}

let bulletsContainer = document.querySelector(".nav-bullets")
let bulletsSpan = document.querySelectorAll(".bullets-option span")
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block"
        } else {
            bulletsContainer.style.display = "none"
        }
        handleActive(e);
        localStorage.setItem("bullets", span.dataset.display)
    })
})

let resetButton = document.querySelector(".reset-options")
resetButton.addEventListener("click", (e) => {
    localStorage.clear();
    window.location.reload();
})

let tlinks = document.querySelector(".links");
let icon = document.querySelector(".links-container span i")
icon.onclick = function() {
    tlinks.classList.toggle("shown");
    document.querySelector(".links-container span").classList.toggle("shown")
}

document.addEventListener("click", (e) => {
    if (e.target != icon && !e.target.parentElement.parentElement.classList.contains("links") && !e.target.classList.contains("links")) {
        if (tlinks.classList.contains("shown")) {
            document.querySelector(".links-container span").classList.remove("shown")
            tlinks.classList.remove("shown");
        }
    }
})
