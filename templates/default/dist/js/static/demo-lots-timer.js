document.addEventListener('DOMContentLoaded', () => {
    const timers = document.querySelectorAll('.js-lot-timer');

    const formatNum = (num) => {
        return num >= 10 ? num : `0${num}`;
    };

    if (timers.length) {
        console.log('Модифицируем время лотов, для демо отсчета времени таймера в верстке у лотов в скрипте demo-lots-timer.js');
    }

    Array.from(timers).forEach((timer) => {
        const timezone = 3;
        const hourInMinutes = 60;
        const minuteInMilliseconds = 60000;
        const utcTime = new Date(Date.now() + (new Date().getTimezoneOffset() * minuteInMilliseconds));
        const moscowTime = new Date(utcTime.getTime() + (timezone * hourInMinutes * minuteInMilliseconds));
        const endTime = new Date(moscowTime.getTime() + ((8 * hourInMinutes * minuteInMilliseconds) + (50 * minuteInMilliseconds)));
        
        const year = endTime.getFullYear();
        const month = formatNum((endTime.getMonth() + 1));
        const day = formatNum(endTime.getDate());
        const hour = formatNum(endTime.getHours());
        const minutes = formatNum(endTime.getMinutes());

        // format data-time-end="2023/03/25 21:56:00"
        timer.setAttribute('data-time-end', `${year}/${month}/${day} ${hour}:${minutes}:00`);
    });
});