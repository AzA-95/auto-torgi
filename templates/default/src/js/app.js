// ------- Скрипты плагинов ----------
import SwiperCore, { Pagination } from 'swiper';

require('lazysizes');
require("@fancyapps/ui");
require('./plugins/disableBodyScroll');
require('./plugins/popup/popup');
// Не менять SlimSelect используется измененый вариант плагина slim-select
require('./plugins/slim-select/dist/slimselect.umd');

const tippy = require('tippy.js/dist/tippy-bundle.umd');

SwiperCore.use([Pagination]);

window.globalPopup = new Popup();
window.tippy = tippy;
window.Swiper = SwiperCore;


// ------- Базовые Скрипты ----------
require('./users/timer');
require('./users/phone-mask');
require('./users/input-password');


// ------- Компонентные Скрипты ----------
const cache = {};
function importAll(r) {
    r.keys().forEach((key) => (cache[key] = r(key)));
}

importAll(require.context("../components/", true, /\.js$/));


// --------- Пользовательские скрипты без компонента -----------
document.body.style.setProperty(
    "--scrollbar-width",
    `${window.innerWidth - document.body.clientWidth}px`
);