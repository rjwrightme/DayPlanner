// declare variables
const m = moment();
let hour;
let calendarItem = {
    text: '',
    color: 'blue'
};

// Set Today's Date using Moment JS
$('#todayDate').html(`<span>${m.format("Do MMMM")}</span> ${m.format("YYYY")}`);
$('#todayDay').text(m.format("dddd"));

// Check local storage for existing entries

function editEvent(id) {
    //show popup
    $('#popUpTime').text(eventTime(id));
    $('#popUp').show();
    $('body').css('overflow', 'hidden');
    hour = id;
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

function saveEntry(id) {
    calendarItem.text = $('#eventText').val();
    $('#' + id).text(calendarItem.text);
    $('#' + id).addClass(calendarItem.color);
    $('#eventText').val('');
    hidePopUp();
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
    saveEntry(hour);
    hidePopUp();
});

// change calendar item color
$('#colorPicker').on('click', function (e) {
    calendarItem.color = e.target.classList[1];
    // remove 'active' class from all colors
    let colors = $('#colorPicker').children();
    for (let i = 0; i < colors.length; i++) {
        $(colors[i]).removeClass('active');
    }
    // add 'active' class to new color
    $(e.target).addClass('active');
    // update textarea to show color
    $('#eventText').removeClass();
    $('#eventText').addClass(calendarItem.color);
});