const title = document.querySelector('.js-sidebar__lots-title');
const list = document.querySelector('.js-sidebar__lots-nav');

if (title && list) {
    list.style.setProperty(
        "--max-height",
        `${list.scrollHeight}px`
    );

    title.addEventListener('click', () => {
        title.parentNode.classList.toggle('active');
    });
}