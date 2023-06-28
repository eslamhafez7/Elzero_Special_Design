
// Random Backgrounds

let landPage = document.querySelector(".main-landing-container");
let imgsArr = [
    "bg-1.jpg",
    "bg-2.webp",
    "bg-3.jpeg",
    "bg-4.webp",
    "bg-5.webp",
    "bg-6.jpeg",
    "bg-7.webp",
    "bg-8.webp",
    "bg-9.jpeg",
    "bg-10.webp",
];
let bgInterval;
let bgOption = true;
function randImgs() {
    if(bgOption === true) {
        bgInterval = setInterval(() => {
            let randNum = Math.floor(Math.random() * imgsArr.length);
            landPage.style.backgroundImage = `url(../images/${imgsArr[randNum]})`;
        }, 10000);        
    }
}
randImgs();


let bgLocalStorageItem = localStorage.getItem("background_option");

if(bgLocalStorageItem !== null) {
    if(bgLocalStorageItem === "true") {
        bgOption = true;
    }else {
        bgOption = false;
    }
    document.querySelectorAll(".rbg-options span").forEach(ele => {
        ele.classList.remove("active");
    });
    if(bgLocalStorageItem === "true") {
        document.querySelector(".rbg-options .yes").classList.add("active");
    }else {
        document.querySelector(".rbg-options .no").classList.add("active");
    }
}
// Toggle Settings Box

let settingsBox = document.querySelector(".settings-box");
let settingsIcon = document.querySelector(".settings-icon i");
settingsIcon.addEventListener("click", () => {
    settingsBox.classList.toggle("open-sidebar");
    settingsIcon.classList.toggle("fa-spin");
});



// Change Main Color
let maincolor = localStorage.getItem("main_color");
if(maincolor !== null) {
    document.documentElement.style.setProperty("--main-color", maincolor);
    document.querySelectorAll(".colors li").forEach(item => {
        item.classList.remove("active")
        if(item.dataset.color === maincolor) {
            item.classList.add("active");
        }
    });
};
const items = document.querySelectorAll(".settings-option .colors li");
items.forEach(item => {
    item.addEventListener("click", (e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        localStorage.setItem("main_color", e.target.dataset.color);
        e.target.parentElement.querySelectorAll(".active").forEach(ele => {
            ele.classList.remove("active");
        });
        e.target.classList.add("active");
    });
});

// Yes, No Option

let RbgO = document.querySelectorAll(".rbg-options span");
RbgO.forEach(span => {
    span.addEventListener("click", (e) => {
        handleActive(e);
        if(e.target.dataset.bg === "yes") {
            bgOption = true;
            randImgs()
            localStorage.setItem("background_option", true);
        }else {
            bgOption = false;
            clearInterval(bgInterval);
            localStorage.setItem("background_option", false);
        }
    });
});




// Scroll To sections 

const bullets = document.querySelectorAll(".controlls .bullet ");
const allLinks = document.querySelectorAll(".nav-list li a");
function sections(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
};
sections(bullets);
sections(allLinks);



// bullets option
const bullOption = document.querySelectorAll(".bullets-option span");
let controlls = document.querySelector(".controlls");
let bulletLocalItem = localStorage.getItem("bullet_option");

if(bulletLocalItem !== null) {
    bullOption.forEach(span => {
        span.classList.remove("active");
    });
    if(bulletLocalItem === "flex") {
        controlls.style.display = "flex";
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else {
        document.querySelector(".bullets-option .no").classList.add("active");
        controlls.style.display = "none";
    }
}
bullOption.forEach(span => {
    span.addEventListener("click", (e) => {
        if(span.dataset.bullet === "yes") {
            controlls.style.display = "flex";
            localStorage.setItem("bullet_option", "flex");
        }else {
            controlls.style.display = "none";
            localStorage.setItem("bullet_option", "none");
        }
        handleActive(e);
    });
});

// Reset Option

document.querySelector(".reset").addEventListener("click", () => {
    localStorage.removeItem("main_color");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullet_option");
    window.location.reload();
});




let skills = document.querySelector(".skills-container");

window.onscroll = () => {
    let skillsOffSetTop = skills.offsetTop;
    let skillsOuterHeight = skills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrolltop = this.pageYOffset;
        if(windowScrolltop > skillsOffSetTop + skillsOuterHeight - windowHeight) {
            let allSkills = document.querySelectorAll(".skill-progress .prog");
            allSkills.forEach(skill => {
                let progress = skill.dataset.progress;
                skill.style.width = progress;
                skill.style.height = "100%"
            });
        }
    }






let gallery = document.querySelectorAll(".gallery-container img");

gallery.forEach(img => {
    img.addEventListener("click", (e) => {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if(img.alt !== null) {
            let imgtitle = document.createElement("h3");
            imgtitle.style.textAlign = "center";
            imgtitle.style.marginBottom = "10px";
            imgtitle.style.color = "var(--main-color)";
            let imgTxt = document.createTextNode(img.alt);
            imgtitle.appendChild(imgTxt);

            popupBox.appendChild(imgtitle);
        }

        let popimage = document.createElement("img");
        popimage.src = img.src;
        popupBox.appendChild(popimage);
        document.body.appendChild(popupBox);

        let close = document.createElement("span");
        close.className = "close-popup";
        close.textContent = "X";
        popupBox.appendChild(close);

        close.addEventListener("click", () => {
            close.parentElement.remove()
            overlay.remove();
        })
    });
});


function handleActive(event) {
    event.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active")
    });
    event.target.classList.add("active");
};



let toggleMenu = document.querySelector(".toggle-menu i");
let navList = document.querySelector(".nav-list");

function toggle() {

    if(navList.className !== "show-menu"){
        toggleMenu.addEventListener("click", () => {
            navList.classList.toggle("show-menu")
        })
    }
}
toggle()

const header = document.querySelector(".header");

let scrollup = () => {
    let scrollUp = document.querySelector("#scroll-up");
    this.scrollY >= 350 ? scrollUp.classList.add("show-scroll") : scrollUp.classList.remove("show-scroll");
scrollUp.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
})
}
window.addEventListener("scroll", scrollup);