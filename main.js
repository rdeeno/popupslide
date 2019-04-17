var imageGrid = document.querySelector(".image__grid");
var overlay = document.querySelector(".overlay");
var closeBtn = document.querySelector(".closeBtn");
var slideWrapper = document.querySelector(".sliderWrapper");
var elements = [...document.querySelectorAll(".img img")];
var next = document.querySelector(".right");
var prev = document.querySelector(".left");
var slide = [...document.querySelectorAll(".slide")];
let current = 0;
var clickedImg;
next.addEventListener("click", function () {
    slideChange('next')
});
prev.addEventListener("click", function () {
    slideChange('prev')
});
overlay.addEventListener("click", closeHelpers)
closeBtn.addEventListener("click", closeHelpers)
imageGrid.addEventListener("click", function (e) {
    e.stopPropagation();
    var target = e.target;
    clickedImg = elements.indexOf(target);
    var checkIfImg = target.closest("img");
    if (!checkIfImg) return;
    overlay.style.transform = "translateY(0)";
    slideWrapper.classList.add("visible");
    slide[clickedImg].classList.add("active");
    current = clickedImg;
});

function slideChange(dir) {
    slide[current].classList.remove("active");
    slide[clickedImg].classList.remove("active");
    current = dir === 'next' ? current += 1 : current -= 1;
    if (current >= slide.length) {
        current = 0;
    } else if (current < 0) {
        current = slide.length - 1;
    }
    slide[current].classList.add("active");
}

function closeHelpers() {
    overlay.style.transform = "translateY(-100%)";
    slideWrapper.classList.remove("visible");
    slide[current].classList.remove("active");
}