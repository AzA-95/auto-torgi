const elements = document.querySelectorAll('.js-select-box__select');

const detectIosMob = () => {
    const toMatch = [
        /iPhone/i,
        /iPad/i,
        /iPod/i,
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

const isNeedShowSearch = (element) => {
    // По бреапониту 1023 строится мобильный фильтр поэтому проверяем по нему так как там другое поведения селектов подробности ниже
    const isPhone = window.matchMedia("(max-width: 1023px)").matches;
    const hasFilterClass = element.classList.contains('js-select-box-filter');

    if (isPhone && hasFilterClass && element.dataset.showSearch) {
        // В Фильтре селект с поиском будет не корректно рабоать в ios(iphone|ipad) без подержки window.visualViewport
        // поэтому отключаем поиск если нет подержки window.visualViewport
        // Подробности в файле components/filte/filter.js в 71 строке
        if (detectIosMob && !window.visualViewport) {
            return false;
        } else {
            return true;
        }
    } else {
        return element.dataset.showSearch || false
    }
}

elements.forEach((element) => {
    const slimSelect = new SlimSelect({
        select: element,
        settings: {
            showSearch: isNeedShowSearch(element),
            searchPlaceholder: 'Поиск',
            searchText: 'Ничего не найдено',
            placeholderText: element.dataset.placeholderText,
            allowDeselect: element.dataset.allowDeselect,
            closeOnSelect: element.hasAttribute('multiple') === false,
        },
    });

    element.parentNode.classList.add('inited');
});