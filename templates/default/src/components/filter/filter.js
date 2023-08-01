let scrollPosOnMob = null;
let filterSelectOnMobWasFocused = false;

const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const toggleBtn = document.querySelector('.js-filter__toggle-btn');
const bottomFields = document.querySelector('.js-filter__bottom-fields');

if (toggleBtn && bottomFields) {
    let defaultBtnText = toggleBtn.textContent;

    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('active');
        bottomFields.classList.toggle('active');
        
        if (toggleBtn.textContent !== 'скрыть') {
            toggleBtn.textContent = 'скрыть'
        } else {
            toggleBtn.textContent = defaultBtnText;
        }
    });
}

const filter = document.querySelector('.js-filter');
const openBtn = document.querySelector('.js-filter-open-btn');

if (filter && openBtn) {
    openBtn.addEventListener('click', () => {
        scrollPosOnMob = window.scrollY;
        disableBodyScroll(true, ['.js-filter__content']);

        filter.classList.add('active');
        document.body.classList.add('hide-scroll');
    });
}

const shadowEl = document.querySelector('.js-filter__shadow');

if (filter && shadowEl) {
    shadowEl.addEventListener('click', () => {
        filter.classList.remove('active');
        document.body.classList.remove('hide-scroll');

        disableBodyScroll(false, ['.js-filter__content']);
        
        if (isIOS && scrollPosOnMob && filterSelectOnMobWasFocused) {
            setTimeout(() => {
                window.scrollTo(0, scrollPosOnMob);
            }, 100);
        }
    });
}

const сloseBtn = document.querySelector('.js-filter__close-btn');

if (filter && сloseBtn) {
    сloseBtn.addEventListener('click', () => {
        filter.classList.remove('active');
        document.body.classList.remove('hide-scroll');
        
        disableBodyScroll(false, ['.js-filter__content']);

        if (isIOS && scrollPosOnMob && filterSelectOnMobWasFocused) {
            setTimeout(() => {
                window.scrollTo(0, scrollPosOnMob);
            }, 100);
        }
    });
}

// Нужен для скролла инупута в мобилке в видимую часть(Если инпут окажется под клавиатурой телефона при открытие селекта) 
if (window.visualViewport) {
    const fullViewportHeight = window.visualViewport.height;
    const filterContent = document.querySelector('.js-filter__content');

    if (filterContent && window.matchMedia("(max-width: 1023px)").matches) {
        window.visualViewport.addEventListener('resize', () => {
            const currentViewportHeight = window.visualViewport.height;

            // Factor проверки на видимость клавиатуры
            // Чтобы невыполнять условие при появление тулбаров бразуера
            const factor = fullViewportHeight.height > fullViewportHeight.width ? 0.66 : 0.45  // Fudge factor to allow for keyboard on iPad

            if ((fullViewportHeight - currentViewportHeight) > (currentViewportHeight * factor)) {
                // console.log('клавиатура показана');
                const focusedEl = document.activeElement;

                // Если селект фильтра получил фокус то выполняем условие
                if (focusedEl && focusedEl.tagName.toLowerCase() === 'input' && focusedEl.closest('.js-select-box-filter')) {
                    // При фокусе по селекту добавляется класс (ios-fixed-filter) ниже который скролит body в верх
                    // Из-за этого даём индикацию переменной что селект получал фокус чтобы вернуть body в исходное положение
                    // при закрытии мобильного фильтра
                    filterSelectOnMobWasFocused = true;

                    // Подробности для чего нужен ios-fixed-filter класс прописан в стилях где указан этот класс
                    if (isIOS) {
                        document.documentElement.classList.add('ios-fixed-filter');
                        
                        // Добавляем снизу паддинг чтобы можно было проскролить к видимой части(Над клавиатурой) самый нижней активный селект в ios iphone
                        const keyboardHeight = fullViewportHeight - currentViewportHeight;
                        const defaultPaddingBottom = parseInt(window.getComputedStyle(filterContent, null).getPropertyValue('padding-bottom'), 10);

                        filterContent.style.paddingBottom = `${defaultPaddingBottom + keyboardHeight}px`;
                    }
                    // Конец

                    const focusedRect = focusedEl.getBoundingClientRect();
                    const inputVisiblePosTop = focusedRect.top + focusedRect.height + focusedEl.offsetHeight;

                    // Проверка на то остался ли инпут получивший фокус под клавиатурой телефона
                    if (inputVisiblePosTop > window.visualViewport.height) {
                        // console.log('видно под клавиатурой');
                        const curentPos = filterContent.scrollTop;
                        const diff = inputVisiblePosTop - window.visualViewport.height;
                        filterContent.scrollTop = curentPos + diff + 20; // 20px нужен чтобы селект был виден немнго выше клавиатуры
                    }
                    // Конец
                }
            } else {
                // console.log('клавиатура скрыта');
                filterContent.style.paddingBottom = '';
                document.documentElement.classList.remove('ios-fixed-filter');
            }
        });
    }
}