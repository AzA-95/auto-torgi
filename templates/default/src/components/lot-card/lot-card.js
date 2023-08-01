document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.js-lot-card__toggle-btn');

    if (toggleBtn) {
        const parent = toggleBtn.closest('.js-lot-card');
        const toggleShowsElements = parent.querySelectorAll('.js-lot-card__toggle-show');

        toggleBtn.classList.toggle('active');

        Array.from(toggleShowsElements).forEach((el) => {
            el.style.maxHeight = 'none';
            const height = el.offsetHeight;
            el.style.maxHeight = '';

            el.style.setProperty(
                "--max-height",
                `${height}px`
            );

            // Нужен чтобы отрабатывала css анимация
            requestAnimationFrame(() => {
                el.classList.toggle('active');
            });
        })

        if (toggleBtn.textContent !== 'свернуть') {
            toggleBtn.textContent = 'свернуть'
        } else {
            toggleBtn.textContent = 'еще';
        }
    }
});
