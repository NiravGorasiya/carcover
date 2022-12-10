const getMonthName = (monthIndex) => {
    let monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthsArray[monthIndex];
}
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


var changeDateFormatTo = date => {
    var date = date.toISOString().slice(0, 10)
    var [yy, mm, dd] = date.split(/-/g);
    return `${dd}-${mm}-${yy}`;
};
module.exports = { getMonthName, days, changeDateFormatTo }