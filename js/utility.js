//utility is used so that functions which is common to both the pages are not repeated twice
const stringifyDate = (date) => {  
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" : 
                    new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}