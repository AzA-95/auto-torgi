{
    // Отрисовка круга по частям
    // Основу кода взял отсюда https://codepen.io/jh3y/pen/bQbpWd там сделано через css
    // Не стал делать через css так как придется генерировать 360 селекторов как в примере codepen выше
    const pieces = document.querySelectorAll('.js-lk-pie-chart__pie');

    const getPosition = (radius, angle) => {
        const PI = Math.PI;
        const cos = Math.cos;
        const sin = Math.sin;

        const xPos = `${(radius * cos(angle * (PI / 180)) * 1) + 50}%`;
        const yPos = `${(radius * sin(angle * (PI / 180)) * 1) + 50}%`;

        return [xPos, yPos]
    };

    const getPolygonPath = (radius, angle) => {
        const [x, y] = getPosition(radius, angle);

        if (angle > 0 && angle <= 45) {
            return `polygon(50% 50%, 100% 50%, ${x} ${y})`;
        }

        if (angle > 45 && angle <= 90) {
            return `polygon(50% 50%, 100% 50%, 100% 100%, ${x} ${y})`;
        }

        if (angle > 90 && angle <= 135) {
            return `polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%, ${x} ${y})`;
        }

        if (angle > 135 && angle <= 180) {
            return `polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%, 0 100%, ${x} ${y})`;
        }

        if (angle > 180 && angle <= 225) {
            return `polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, ${x} ${y})`;
        }

        if (angle > 225 && angle <= 270) {
            return `polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, ${x} ${y})`;
        }

        if (angle > 270 && angle <= 315) {
            return `polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, 50% 0, ${x} ${y})`;
        }

        if (angle > 315 && angle <= 360) {
            return `polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, 50% 0, 100% 0, ${x} ${y})`;
        }

        return null;
    };

    pieces.forEach((el) => {
        const radius = el.clientWidth;
        const startPercentage = parseInt(el.getAttribute('data-start'), 10);
        const endPercentage  = parseInt(el.getAttribute('data-end'), 10);

        if (startPercentage >= 0 && endPercentage <= 100) {
            const startInDegree = startPercentage * 3.6;
            const endInDegree = (endPercentage - startPercentage) * 3.6;

            const rotate = `rotate(-90deg) rotate(${startInDegree}deg)`;
            const polygon = getPolygonPath(radius, endInDegree);

            if (polygon !== null) {
                el.style.transform = rotate;
                el.style.clipPath = polygon;
                el.classList.add('inited');
            }
        }
    });
}