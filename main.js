class modalSlide {
    constructor() {
        this.imageGrid = document.querySelector(".image__grid");
        this.overlay = document.querySelector(".overlay");
        this.closeBtn = document.querySelector(".closeBtn");
        this.slideWrapper = document.querySelector(".sliderWrapper");
        this.elements = [...document.querySelectorAll(".img img")];
        this.next = document.querySelector(".right");
        this.prev = document.querySelector(".left");
        this.slide = [...document.querySelectorAll(".slide")];
        this.current = 0;
        this.clickedImg;
        this.imageGrid.addEventListener("click", this.getElements.bind(this));
        this.next.addEventListener("click", this.slideChange.bind(this, 'next'));
        this.prev.addEventListener("click", this.slideChange.bind(this, 'prev'));
        this.overlay.addEventListener("click", this.closeHelpers.bind(this));
        this.closeBtn.addEventListener("click", this.closeHelpers.bind(this))
    }
    getElements(e) {
        e.stopPropagation();
        var target = e.target;
        this.clickedImg = this.elements.indexOf(target);
        var checkIfImg = target.closest("img");
        if (!checkIfImg) return;
        this.overlay.style.transform = "translateY(0)";
        this.slideWrapper.classList.add("visible");
        this.slide[this.clickedImg].classList.add("active");
        this.current = this.clickedImg;
    }
    slideChange(dir) {
        this.slide[this.current].classList.remove("active");
        this.slide[this.clickedImg].classList.remove("active");
        this.current = dir === 'next' ? this.current += 1 : this.current -= 1;
        if (this.current >= this.slide.length) {
            this.current = 0;
        } else if (this.current < 0) {
            this.current = this.slide.length - 1;
        }
        this.slide[this.current].classList.add("active");
    }
    closeHelpers() {
        this.overlay.style.transform = "translateY(-100%)";
        this.slideWrapper.classList.remove("visible");
        this.slide[this.current].classList.remove("active");
    }
}
new modalSlide()