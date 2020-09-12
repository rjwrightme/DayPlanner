const m = moment();

// Set Today's Date using Moment JS
$('#todayDate').html(`<span>${m.format("Do MMMM")}</span> ${m.format("YYYY")}`);
$('#todayDay').text(m.format("dddd"));


function editEvent(hour) {
    //show popup
    console.log(hour);
    $('#popUp').show();
    $('body').css('overflow', 'hidden');

    // hide popup if user clicks away
    $('#popUp').click(function (e) {
        if (e.target.id === 'popUp') {
            $('#popUp').hide();
            $('body').css('overflow', 'scroll');
        }
    });
}

function currentHour() {
    // add correct styles to hour blocks
}

// Event Handlers
$('.hourBlock').click(function (e) {
    editEvent(e.target.id);
});