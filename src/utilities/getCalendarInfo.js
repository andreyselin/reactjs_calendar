export const getCalendarInfo = (month, year) => {
    const monthStartDate = new Date(year, month, 1, 0, 0, 0, 0);
    const daysInMonth = (new Date(year, month+1, 0, 0, 0, 0, 0)).getDate();
    const lastDayOfMonth = (new Date(year, month+1, 0, 0, 0, 0, 0)).getDay();
    const daysInPrevMonth = (new Date(year, month, 0, 0, 0, 0, 0)).getDate();
    const preDaysCount = monthStartDate.getDay();
    const todayDate = new Date();
    const today = {
        date:  todayDate.getDate(),
        month: todayDate.getMonth(),
        year:  todayDate.getFullYear(),
    };

    const preDays = [];
    for (let i = daysInPrevMonth, days=0; days < preDaysCount; i--, days++ ) {
        preDays.push(i);
    }

    const monthDays = [];
    for (let i = 1; i < daysInMonth+1; i++) {
        monthDays.push(i);
    }

    const postDays = [];
    for (let i = 1; i < 6-lastDayOfMonth+1; i++) {
        postDays.push(i);
    }


    const weekDayNames = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
    const monthNames   = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

    return {
        preDays: preDays.sort((a,b)=>a-b),
        monthDays,
        postDays,
        today,
        isCurrentMonth: today.year === year && today.month === month,
        weekDayNames,
        monthNames
    };
};