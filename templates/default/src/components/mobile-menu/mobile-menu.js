const header = document.querySelector('.js-header');
const menu = document.querySelector('.js-mobile-menu');
const hamburger = document.querySelector('.js-hamburger');

if (header && menu && hamburger) {
    hamburger.addEventListener('click', () => {
        header.classList.toggle('active');
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('hide-scroll');
    });
}

const title = document.querySelector('.js-mobile-menu__lots-title');
const list = document.querySelector('.js-mobile-menu__lots-nav');

if (title && list) {
    list.style.setProperty(
        "--max-height",
        `${list.scrollHeight}px`
    );

    title.addEventListener('click', () => {
        title.parentNode.classList.toggle('active');
    });
}