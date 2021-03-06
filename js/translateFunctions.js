/**
 * Translates a numerical day into a textual day.
 * @param   day int The numerical representation of the day
 * @returns Three letter representation of the day
 */
translateDay = function(day) {
    // Modulo it to make sure we get the correct days
    day = day % 7;

    // Now switch on the different days
    switch(day) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thu";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return null;
    }
}
Handlebars.registerHelper("formatDay", translateDay);

/**
 * Takes a time specified as the number of minutes into the day and returns
 * a time string with hours and minutes.
 * @param minutes   int The number of minutes into the day
 * @returns String representation of the time with hours and minutes
 */
translateMinutesToTime = function(minutes) {
    // Modulo the minutes to make sure we get valid minutes
    minutes = minutes % 1440;

    // Figure out how many hours
    var hours = Math.floor(minutes / 60);

    // Figure out how many minutes
    var remMinutes = minutes % 60;

    // Correct for AM/PM
    var ampm;
    if(hours >= 12) {
        ampm = "pm";
        hours -= 12
    } else {
        ampm = "am";
    }

    // Correct for 0 hour
    if(hours == 0) {
        hours = 12;
    }

    // Correct minutes less than 10 min
    if(remMinutes < 10) {
        remMinutes = "0" + remMinutes;
    }

    // Put it together
    return hours + ":" + remMinutes + ampm;
};

/**
 * Converts a string representation of the time into the number of minutes
 * into the day.
 * @param time  string  A string representation of the time
 * @returns int The number of minutes into the day
 */
translateTimeToMinutes = function(time) {
    // Strip off each part of the time
    var regexMatch = time.match(/([0-9]+):([0-9]{2})(am|pm)/);
    var hour = parseInt(regexMatch[1]) % 12;
    var min = parseInt(regexMatch[2]);
    if(regexMatch[3] == 'pm') {
        hour += 12;
    }

    return (hour * 60) + min;
};

// Register this function as a handlebars helper
Handlebars.registerHelper("formatTime", translateMinutesToTime);