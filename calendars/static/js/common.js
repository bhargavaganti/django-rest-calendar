
function change_month(year, month, offset) {
    var new_year = year;
    var new_month = month + offset;
    if (new_month > 12) {
        new_year++;
        new_month = 1;
    } else if (new_month < 1) {
        new_year--;
        new_month = 12;
    }
    current_year = new_year;
    current_month = new_month;
}

function load_month(year, month) {
    $.get('/calendars/api/get_calendar_monthly/'+ year + '/' + month + '/' + today, {}, function(data) {
           $('#little_calendar').html(data);
       });
}

function load_month_detailed(year, month) {
    $.get('/calendars/api/get_calendar_monthly_detailed/'+ year + '/' + month + '/' + today, {'calendars': [1,2,3,4,5]}, function(data) {
           $('#large_calendar').html(data);
       });
}

function load_week_detailed(year, month) {
    $.get('/calendars/api/get_calendar_weekly_detailed/'+ year + '/' + month + '/' + today, {'calendars': [1,2,3,4,5]}, function(data) {
           $('#large_calendar').html(data);
       });
}

function load_day_detailed(year, month) {
    $.get('/calendars/api/get_calendar_daily_detailed/'+ year + '/' + month + '/' + today, {'calendars': [1,2,3,4,5]}, function(data) {
           $('#large_calendar').html(data);
       });
}

function load_user_calendars() {
    $.get('/calendars/api/user/calendars/', {}, function(data) {
        data.forEach(function(entry) {
            var html = "<div id='calendar_"+entry['id']+"' class='user_calendar'>";
            html += "<div class='calendar_icon' style='background-color: #"+entry['color']+" ;'>&nbsp;</div><div>"+entry['name']+"</div></div>";
            $(html).appendTo( "#user_calendars");
        });
    });
}

function select_view_mode(mode) {
    $('.upper .view').each(function() {
        $(this).removeClass('selected');
    })
    mode.addClass('selected');
}

$(document).ready(function() {
   $('.larrow').click(function() {
        change_month(current_year, current_month, -1);
        load_month(current_year, current_month, today);
    });

   $('.rarrow').click(function() {
        change_month(current_year, current_month, 1);
        load_month(current_year, current_month, today);
   });

   $('#daily_view').click(function() {
        select_view_mode($(this));
        load_day_detailed(current_year, current_month, today);
   });

   $('#weekly_view').click(function() {
        select_view_mode($(this));
        load_week_detailed(current_year, current_month, today);
   });

   $('#monthly_view').click(function() {
        select_view_mode($(this));
        load_month_detailed(current_year, current_month, 0);
   });

   // load initial month
   load_month(current_year, current_month, today);
   load_user_calendars();
});