let today               = new Date();
let currentDate         = today.getDate();
today.setDate(currentDate + 10);
let currentDatePlus    = today.getDate().toString().padStart(2, "0");
let currentMonth        = (today.getMonth() + 1).toString().padStart(2, "0");
let currentYear         = today.getFullYear().toString().padStart(4, "0");
today.setFullYear(today.getFullYear() - 25);
let birthdayYear        = today.getFullYear();
let date                = `${currentYear}-${currentMonth}-${currentDatePlus}`;
let dateVer2            = `${currentDatePlus}-${currentMonth}-${currentYear}`;
let birthday            = `${birthdayYear}-${currentMonth}-${currentDate}`;
let birthdayVer2        = String(`${currentDatePlus}-${currentMonth}-${birthdayYear}`);
today.setDate(currentDate + 15);
let datePlus            = today.getDate().toString().padStart(2, "0");
let dateExit            = `${currentYear}-${currentMonth}-${datePlus}`;


module.exports = {
    currentDate,
    currentDatePlus,
    currentMonth,
    currentYear,
    birthdayYear,
    date,
    dateVer2,
    birthday,
    birthdayVer2,
    dateExit
}