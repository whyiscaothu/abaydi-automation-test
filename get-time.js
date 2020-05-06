let today               = new Date();
let currentDate         = today.getDate();
today.setDate(currentDate + 4);
let currentDatePlus4    = today.getDate().toString().padStart(2, "0");
let currentMonth        = (today.getMonth() + 1).toString().padStart(2, "0");
let currentYear         = today.getFullYear().toString().padStart(4, "0");
today.setFullYear(today.getFullYear() - 25);
let birthdayYear        = today.getFullYear();
let date                = `${currentYear}-${currentMonth}-${currentDatePlus4}`;
let dateVer2            = `${currentDatePlus4}-${currentMonth}-${currentYear}`;
let birthday            = `${birthdayYear}-${currentMonth}-${currentDate}`;
let birthdayVer2        = `${currentDatePlus4}-${currentMonth}-${birthdayYear}`;

module.exports = {
    currentDate,
    currentDatePlus4,
    currentMonth,
    currentYear,
    birthdayYear,
    date,
    dateVer2,
    birthday,
    birthdayVer2
}