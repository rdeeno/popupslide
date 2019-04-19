var imageGrid = [...document.querySelectorAll(".image__grid")];
var overlay = document.querySelector(".overlay");
var closeBtn = document.querySelector(".closeBtn");
var nextBtn = document.querySelector(".right");
var prevBtn = document.querySelector(".left");
var slideWrapper = document.querySelector(".sliderWrapper");
var imageGridElms = [...document.querySelectorAll(".img img")];
var slideElm = [...slideWrapper.querySelectorAll(".slide")];
let current = 0;
var clickedImg;
nextBtn.addEventListener("click", function () {
    slideChange('next')
});
prevBtn.addEventListener("click", function () {
    slideChange('prev')
});
overlay.addEventListener("click", closeHelpers)
closeBtn.addEventListener("click", closeHelpers)
imageGrid.forEach(el => {
    el.addEventListener("click", getClickImg);
})

function getClickImg(e) {
    e.stopPropagation();
    var target = e.target;
    clickedImg = imageGridElms.indexOf(target);
    var checkIfImg = target.closest("img");
    if (!checkIfImg) return;
    slideWrapper.classList.add("visible");
    document.querySelector('.helper').classList.add('visible')
    slideElm[clickedImg].classList.add("active");
    current = clickedImg;
}

function slideChange(dir) {
    slideElm[current].classList.remove("active");
    slideElm[clickedImg].classList.remove("active");
    current = dir === 'next' ? current += 1 : current -= 1;
    if (current >= slideElm.length) {
        current = 0;
    } else if (current < 0) {
        current = slideElm.length - 1;
    }
    slideElm[current].classList.add("active");
}

function closeHelpers() {
    document.querySelector('.helper').classList.remove('visible')
    slideWrapper.classList.remove("visible");
    slideElm[current].classList.remove("active");
}