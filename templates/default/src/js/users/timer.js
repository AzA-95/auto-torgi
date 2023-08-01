import { getServerDate } from "../../js/plugins/server-date";

const headerTime = document.querySelector('.js-header-time');

const updateHeaderTime = (serverDate) => {
    const formatedHours = ("0" + serverDate.getHours()).slice(-2);
    const formatedMinutes = ("0" + serverDate.getMinutes()).slice(-2);

    headerTime.innerHTML = `${formatedHours}:${formatedMinutes}`;
};

let timers = document.querySelectorAll('.js-lot-timer');

// Событие тригерится с бекенда при подгрузке новых лотов по ajax
document.addEventListener("new-lots-loaded", () => {
    // При следушем вызове функции updateLotsTimer подхватятся новые таймеры лотов
    timers = document.querySelectorAll('.js-lot-timer');
});

const updateLotsTimer = (serverDate) => {
    // Get today's date and time
    // Минус одна секунда(1000) задержки так как updateLotsTimer вызывается с задержкой на секнду
    const now = serverDate.getTime() - 1000;

    const getFormatedTime = (distance) => {
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return {
            days,
            hours,
            minutes,
            seconds
        }
    };

    Array.from(timers).forEach((timer) => {
        if (timer) {
            const dateTimeEnd = Date.parse(timer.getAttribute('data-time-end'));
            
            if (isNaN(dateTimeEnd)) return;
            
            // Find the distance between now and the count down date
            const distance = dateTimeEnd - now;
            const { days, hours, minutes, seconds } = getFormatedTime(distance);

            // If the count down is over
            if (distance < 0) {
                timer.innerHTML = "0м 0c";
            } else {
                if (days === 0) {
                    if (hours > 0) {
                        timer.innerHTML = `${hours}ч ${minutes}м`;
                    } else {
                        timer.innerHTML = `${minutes}м ${seconds}с`;
                    }
                } else {
                    if (hours == 0) {
                        timer.innerHTML = `${days}д ${minutes}м`;
                    } else {
                        timer.innerHTML = `${days}д ${hours}ч`;
                    }
                }
            }
        }
    });
};

const getDateByTimezone = (timezone, isTimezoneSignPositive) => {
    const hourInMinutes = 60;
    const minuteInMilliseconds = 60000;
    const utcTime = new Date(Date.now() + (new Date().getTimezoneOffset() * minuteInMilliseconds));

    if (isTimezoneSignPositive) {
        return new Date(utcTime.getTime() + (timezone * hourInMinutes * minuteInMilliseconds));
    } else {
        return new Date(utcTime.getTime() - (timezone * hourInMinutes * minuteInMilliseconds));
    }
};

const startTimer = (offsetTime) => {
    setInterval(() => {
        // Меняем часовой пояс на Московсое время
        const moscowTime = getDateByTimezone(3, true);
        // Добавляем смешение времени offsetTime чтобы время было эквалентно серверному времени
        const serverDate = new Date(moscowTime.getTime() + offsetTime);

        if (headerTime) {
            updateHeaderTime(serverDate);
        }

        if (timers.length) {
            updateLotsTimer(serverDate);
        }
    }, 1000);
};

const getServerTime = async () => {
    try {
        const { date, offset, uncertainty } = await getServerDate();
        // const serverDate = new Date(Date.now() + offset);
        // console.log(`The server's date is ${date} +/- ${uncertainty} milliseconds.`);
        
        // offset это смешение времени между сервером и клиентским временем в милисекундах
        startTimer(offset);
    } catch {
        // Если не получилось получить время с сервера
        // Устанавливаем отсчет таймера от клиентского часового пояса
        const offset = 0;

        startTimer(offset);
    }
};

getServerTime();