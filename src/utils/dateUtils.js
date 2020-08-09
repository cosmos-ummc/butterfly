export const dateParser = date => {
    return date.replace(/-/g, "");
};

export const dateFormat = date => {
    if (date === undefined || date.length !== 8)
        return date;
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6);
    return year + '-' + month + '-' + day;
};

export const dateFormatForLineChart = date => {
    if (date === undefined || date.length !== 8)
        return date;
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6);
    return day + '/' + month + '/' + year;
};

export const getTodayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return yyyy + '' + mm + '' + dd;
};

export const getDateDiff = (date, diff) => {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6);

    const newDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    newDate.setDate(newDate.getDate() + diff);

    const dd = String(newDate.getDate()).padStart(2, '0');
    const mm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = newDate.getFullYear();
    return yyyy + '' + mm + '' + dd;
};
