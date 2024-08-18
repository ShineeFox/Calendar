let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector(".cal-dates");

const currentDate = document.querySelector(".cal-current-date");

const preNexIcons = document.querySelectorAll(".cal-nav span");

// Array for Months
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

// Making the Calendar
const manipulate = () => {

    // Getting the first day of each month
    let firstDay = new Date(year, month, 1).getDay();

    // Getting the last date of each month
    let lastDate = new Date(year, month + 1, 0).getDate();

    // Getting the day of the last date for each month
    let endDay = new Date(year, month, lastDate).getDay();

    // Getting the last day of the previous month
    let prevLastDate = new Date(year, month, 0).getDate();

    // Variable to store date info
    let allDates = "";

    // Loop to add the previous months last days
    for (let i = firstDay; i > 0; i--) {
        allDates += `<li class="inactive">${prevLastDate - i + 1}</li>`;
    }

    // Loop to add all days of the current month
    for (let i = 1; i <= lastDate; i++) {
        
        //Check if the current date is today
        let itsToday = i === date.getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear()
            ? "active"
            : "";
        allDates += `<li class="${itsToday}">${i}</li>`;
    }

    // Loop to add the first days of the next month
    for (let i = endDay; i < 6; i++) {
        allDates += `<li class="inactive">${i - endDay + 1}</li>`
    }

    //Updating the text if the current date element with the formatted month and year
    currentDate.innerText = `${months[month]} ${year}`;

    //Updating the HTML of the dates element with the calendar
    day.innerHTML = allDates;
}

manipulate();

// Attaching a click listener to the icons
preNexIcons.forEach(icon => {

    // When the icon is clicked
    icon.addEventListener("click", () => {

        //Check to see if its previous or next month
        month = icon.id === "cal-prev" ? month - 1 : month + 1;

        //Checking to see if the month is out of range
        if (month < 0 || month > 11) {

            // Setting the date to the first day of the month with the new year
            date = new Date(year, month, new Date().getDate());

            // Setting the year to the new year
            year = date.getFullYear();

            // Setting the month to the new month
            month = date.getMonth();
        }

        else {

            // Setting it to the current date
            date = new Date();
        }

        // Calling the manipulate function in order to update the calendar display
        manipulate();
    });
});