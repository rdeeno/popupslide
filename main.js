class modalSlide {
    constructor(selector, options) {
        var defaults = {
            slideContainer: '.con'
        }
        this.params = Object.assign({}, defaults, options)
        this.imageGrid = selector;
        this.imageGridElms = [...this.imageGrid.querySelectorAll(".img img")];
        this.slideWrapper = document.querySelector(this.params.slideContainer);
        this.slideWrapperElms = this.slideWrapper.querySelectorAll(".slide");
        this.overlay = document.querySelector(".overlay");
        this.closeBtn = document.querySelector(".closeBtn");
        this.nextBtn = document.querySelector(".right");
        this.prevBtn = document.querySelector(".left");
        this.current = 0;
        this.clickedImg;
        this.imageGrid.addEventListener("click", this.getElements.bind(this));
        this.nextBtn.addEventListener("click", this.slideChange.bind(this, 'next'));
        this.prevBtn.addEventListener("click", this.slideChange.bind(this, 'prev'));
        this.overlay.addEventListener("click", this.closeHelpers.bind(this));
        this.closeBtn.addEventListener("click", this.closeHelpers.bind(this))
    }
    getElements(e) {
        e.stopPropagation();
        var target = e.target;
        this.clickedImg = this.imageGridElms.indexOf(target);
        var checkIfImg = target.closest("img");
        if (!checkIfImg) return;
        document.querySelector('.helper').classList.add('visible');

        this.slideWrapper.classList.add("visible");

        this.slideWrapperElms[this.clickedImg].classList.add("active");
        this.current = this.clickedImg;
    }
    slideChange(dir) {
        this.slideWrapperElms[this.current].classList.remove("active");
        this.slideWrapperElms[this.clickedImg].classList.remove("active");
        this.current = dir === 'next' ? this.current += 1 : this.current -= 1;
        if (this.current >= this.slideWrapperElms.length) {
            this.current = 0;
        } else if (this.current < 0) {
            this.current = this.slideWrapperElms.length - 1;
        }
        this.slideWrapperElms[this.current].classList.add("active");
    }
    closeHelpers() {
        document.querySelector('.helper').classList.remove('visible');

        this.slideWrapper.classList.remove("visible");

        this.slideWrapperElms[this.current].classList.remove("active");
    }
}

var item = document.querySelector('.imgGrd')
var itemSecond = document.querySelector('.imgGrd-second')
new modalSlide(item, {
    slideContainer: '.sldWrp'
})
new modalSlide(itemSecond, {
    slideContainer: '.sldWrp-second'
})