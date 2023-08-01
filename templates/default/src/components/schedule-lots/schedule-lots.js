document.addEventListener('click', (e) => {
    const sheduleNameBtn = e.target.closest('.js-schedule-lot__name');

    if (sheduleNameBtn) {
        const parent = sheduleNameBtn.parentNode;
        const rows = sheduleNameBtn.nextElementSibling;

        if (!rows) return;

        parent.style.setProperty(
            "--max-height",
            `${rows.scrollHeight}px`
        );

        // Нужен чтобы отрабатывала css анимация
        requestAnimationFrame(() => {
            parent.classList.toggle('active');
        });
    }
});


const scheduleLots = document.querySelector('.js-schedule-lots');
const changeViewBtns = document.querySelectorAll('.js-sort-line__change-view-btn');

if (scheduleLots && changeViewBtns.length) {
    changeViewBtns.forEach((changeViewBtn) => {
        changeViewBtn.addEventListener('click', () => {
            const activeViewBtn = document.querySelector('.js-sort-line__change-view-btn.active');
            
            if (activeViewBtn) {
                activeViewBtn.classList.remove('active');
            }

            changeViewBtn.classList.add('active');

            const isViewTypeGraph = changeViewBtn.classList.contains('view-type-graph');

            if (isViewTypeGraph) {
                scheduleLots.classList.add('view-type-graph');
            } else {
                scheduleLots.classList.remove('view-type-graph');
            }
        });
    });
}