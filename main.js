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
        this.helper = document.querySelector('.helper')
        this.nextBtn = document.querySelector(".right");
        this.prevBtn = document.querySelector(".left");
        this.iframeContent = document.querySelector('#video');
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
        var checkIfImg = target.closest("div");
        if (!checkIfImg) return;
        this.clickedImg = this.imageGridElms.indexOf(target);
        this.helper.classList.add('visible');
        this.slideWrapper.classList.add("visible");
        this.slideWrapperElms[this.clickedImg].classList.add("active");
        this.current = this.clickedImg;
        if (this.slideWrapperElms[this.current].querySelector('iframe')) {
            this.iframeContent.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
        }
        console.log(this.slideWrapperElms[this.clickedImg].querySelector('iframe'));
        console.log(this.current);
    }
    slideChange(dir) {
        this.slideWrapperElms[this.current].classList.remove("active");
        this.current = dir === 'next' ? this.current += 1 : this.current -= 1;

        this.iframeContent.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
        if (this.current >= this.slideWrapperElms.length) {
            this.current = 0;
        } else if (this.current < 0) {
            this.current = this.slideWrapperElms.length - 1;
        }
        if (this.slideWrapperElms[this.current].querySelector('iframe')) {
            this.iframeContent.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
        }
        this.slideWrapperElms[this.current].classList.add("active");
    }
    closeHelpers() {
        this.helper.classList.remove('visible');
        this.slideWrapper.classList.remove("visible");
        this.slideWrapperElms[this.current].classList.remove("active");
        this.iframeContent.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
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