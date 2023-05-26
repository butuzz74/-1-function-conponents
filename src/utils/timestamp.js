export const timestamp = (timeCreate) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const now = Date.now();
    const time = (+now - +timeCreate) / 1000 / 60;
    if (time < 1) {
        return "1 минуту назад";
    }
    if (time > 1 && time < 5) {
        return "5 минут назад";
    }
    if (time > 5 && time < 10) {
        return "10 минут назад";
    }
    if (time > 10 && time < 30) {
        return "30 минут назад";
    }
    if (time > 30 && time < 1440) {
        const d = new Date(+timeCreate);
        return d.getHours() < 10 ? ("0" + d.getHours() + ":" + d.getMinutes()) : (d.getHours() + ":" + d.getMinutes());
    }
    if (time > 1440 && time < 525600) {
        const d = new Date(+timeCreate);
        return d.getDay() + " " + months[d.getMonth()];
    }
    if (time > 525600) {
        const d = new Date(+timeCreate);
        return d.getDay() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }
};
