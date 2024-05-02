/**
 *
 * You can write your JS code here, DO NOT touch the default style file
 * because it will make it harder for you to update.
 * 
 */

"use strict";

$('#expirydatepicker').datepicker({
    uiLibrary: 'bootstrap4',
    format:'dd-mm-yyyy'
});

//delete item
function delete_item(url, id, message) {
    swal({
        text: message,
        icon: "warning",
        buttons: true,
        buttons: [sweetalert_cancel, sweetalert_ok],
        dangerMode: true,
    }).then(function (willDelete) {
        if (willDelete) {
            var data = {
                'id': id,
            };
            data[csfr_token_name] = $.cookie(csfr_cookie_name);
            $.ajax({
                type: "POST",
                url: base_url + url,
                data: data,
                success: function (response) {
                    location.reload();
                }
            });
        }
    });
};

function selectDate(date) {
  $('#calendarPicker').updateCalendarOptions({
    date: date
  });

  var dateOb = new Date(date).toLocaleDateString();

  $('input[name=expiry_date]').val(dateOb);
}

var currentDate = new Date();
currentDate.setDate(currentDate.getDate());
var defaultConfig = {
  weekDayLength: 1,
  date: $('input[name=expiry_date]').val(),
  onClickDate: selectDate,
  showYearDropdown: true,
  showTodayButton:false,
  formatDate:function(day) {
        return day.getDate();
    }
};

$('#calendarPicker').calendar(defaultConfig); 
