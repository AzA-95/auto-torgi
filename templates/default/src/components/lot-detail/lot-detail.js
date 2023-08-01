// For slider
{
    const slider = new Swiper('.js-lot-detail-slider__swiper', {
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            dynamicMainBullets: 3,
        },
    });
    
    const thumbs = document.querySelectorAll('.js-lot-detail-slider__thumb_change-slide');

    const removeInactiveClass = (elements, activeEl) => {
        Array.from(elements).forEach((el) => {
            if (el !== activeEl) {
                el.classList.remove('active');
            }
        });
    };

    Array.from(thumbs).forEach((el, index) => {
        el.addEventListener('click', () => {
            slider.slideTo(index);
            el.classList.add('active');
            removeInactiveClass(thumbs, el);
        });
    });

    const counter = document.querySelector('.js-lot-detail-slider__slide-dynamic-count');

    slider.on('slideChange', function() {
        if (counter) {
            counter.textContent = this.activeIndex + 1;
        }

        if (this.activeIndex < 4) {
            const activeEl = thumbs[this.activeIndex];
            removeInactiveClass(thumbs, activeEl);
            if (activeEl) { // Check beacuse the thumb of index 3 may not be
                activeEl.classList.add('active');
            }
        } else {
            removeInactiveClass(thumbs, null);
        }
    });
}
// End

// For open fancybox by click on the last thumb if count of sliders more then 4
{
    const fancyboxEls = document.querySelectorAll('.js-lot-detail-slider__fancybox-el');
    const lastThumb = document.querySelector('.js-lot-detail-slider__thumb_open-fancybox');

    if (fancyboxEls.length && lastThumb) {
        lastThumb.addEventListener('click', () => {
            fancyboxEls[3].click(); // trigger click for open fancybox on third index elemenet because index of lastThumb element is third
        });
    }
}