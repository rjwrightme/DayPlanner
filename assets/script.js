// declare variables
const m = moment();
let hour;
let calendarItem = {
    text: '',
    color: 'blue'
};
let localTime = parseInt(m.format("H"));

// Set Today's Date using Moment JS
$('#todayDate').html(`<span>${m.format("Do MMMM")}</span> ${m.format("YYYY")}`);
$('#todayDay').text(m.format("dddd"));

// Check local storage for existing entries. Render them if they exist.
for (let i = 9; i < 18; i++) {
    let time;
    i < 10 ? time = 'hour09' : time = 'hour' + i;
    if (localStorage.length > 0) {
        if (localStorage.getItem(time) !== null) {
            calendarItem = JSON.parse(localStorage.getItem(time));
            $('#' + time).addClass(calendarItem.color);
            $('#' + time).text(calendarItem.text);
        }
    }
    if (localTime > 9) {
        $('.spacer').addClass('past');
    }
    if (i < localTime) {
        $('#' + time).parent().parent().addClass('past');
        $('#' + time).removeClass();
        $('#' + time).addClass('hourEvent past');
    } else if (i == localTime) {
        $('#' + time).parent().parent().append('<div id="current"></div>');
    }
}

function editEvent(time) {
    //show popup
    hour = time;
    // check localStorage for previously saved events
    if (localStorage.getItem(hour) !== null) {
        calendarItem = JSON.parse(localStorage.getItem(hour));
        changeColor(calendarItem.color);
        $('#eventText').val(calendarItem.text);
    }
    $('#popUpTime').text(eventTime(time));
    $('#popUp').show();
    $('body').css('overflow', 'hidden');
}

function eventTime(time) {
    // convert 'HourXX' into the desired Title format
    switch (time) {
        case 'hour09':
            return '9am - 10am';
        case 'hour10':
            return '10am - 11am';
        case 'hour11':
            return '11am - 12pm';
        case 'hour12':
            return '12pm - 1pm';
        case 'hour13':
            return '1pm - 2pm';
        case 'hour14':
            return '2pm - 3pm';
        case 'hour15':
            return '3pm - 4pm';
        case 'hour16':
            return '4pm - 5pm';
        case 'hour17':
            return '5pm - 6pm';
    }
}

function currentHour() {
    // add correct styles to hour blocks
}

function hidePopUp() {
    $('#popUp').hide();
    $('body').css('overflow', 'scroll');
}

function saveEntry() {
    calendarItem.text = $('#eventText').val();
    $('#' + hour).text(calendarItem.text);
    $('#' + hour).removeClass();
    $('#' + hour).addClass('hourEvent ' + calendarItem.color);
    $('#eventText').val('');
    localStorage.setItem(hour, JSON.stringify(calendarItem));
    hidePopUp();
}

function changeColor(color) {
    // remove 'active' class from all colors
    let colors = $('#colorPicker').children();
    for (let i = 0; i < colors.length; i++) {
        $(colors[i]).removeClass('active');
        if ($(colors[i]).hasClass(color)) {
            // add 'active' class to new color
            $(colors[i]).addClass('active');
        }
    }
    // update textarea to show color
    $('#eventText').removeClass();
    $('#eventText').addClass(color);
}

// Event Handlers

// Add or edit calendar item
$('#planner').on('click', function (e) {
    if ($(e.target).hasClass('hourEvent')) {
        editEvent(e.target.id);
    }
});
// hide popup if user clicks away
$('#popUp').on('click', function (e) {
    if (e.target.id === 'popUp') {
        hidePopUp();
    }
});

// save calendar entry
$('#saveBtn').on('click', function () {
    saveEntry();
    hidePopUp();
});

// change calendar item color
$('#colorPicker').on('click', function (e) {
    calendarItem.color = e.target.classList[1];
    changeColor(calendarItem.color);
});