(function (jQuery) {
    var todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    // define months
    var monthMap = {
        1: "january",
        2: "february",
        3: "march",
        4: "april",
        5: "may",
        6: "june",
        7: "july",
        8: "august",
        9: "september",
        10: "october",
        11: "november",
        12: "december",
    };

    // define days
    var dayMap = {
        0: "sunday",
        1: "monday",
        2: "tuesday",
        3: "wednesday",
        4: "thursday",
        5: "friday",
        6: "saturday",
    };

    // define alternate days
    var alternateDayMap = {
        1: "monday",
        2: "tuesday",
        3: "wednesday",
        4: "thursday",
        5: "friday",
        6: "saturday",
        7: "sunday",
    };

    // set allow date range
    var allow_min_date = todayDate.setDate(todayDate.getDate() + 0);
    var allow_max_date = todayDate.setDate(todayDate.getDate() + 1095);

    // define options
    var defaults = {
        date              : null,
        weekDayLength     : 1,
        prevButton        : "Prev",
        nextButton        : "Next",
        monthYearSeparator: " ",
        onClickDate       : function (date) {},
        onChangeMonth     : function (date) {},
        onClickToday      : function (date) {},
        onClickMonthNext  : function (date) {},
        onClickMonthPrev  : function (date) {},
        onClickYearNext   : function (date) {},
        onClickYearPrev   : function (date) {},
        onShowYearView    : function (date) {},
        onSelectYear      : function (date) {},
        customDateProps   : function (date) {
            return {
                classes: "",
                data: {}
            };
        },
        customDateHeaderProps: function (weekDay) {
            return {
                classes: "",
                data: {}
            };
        },
        customWeekProps: function (weekNo) {
            return {
                classes: "",
                data: {}
            };
        },
        showThreeMonthsInARow   : true,
        enableMonthChange       : true,
        enableYearView          : true,
        showTodayButton         : true,
        highlightSelectedWeekday: true,
        highlightSelectedWeek   : true,
        todayButtonContent      : "Today",
        showYearDropdown        : false,
        min                     : allow_min_date,
        max                     : allow_max_date,
        disable                 : function (date) {},
        startOnMonday: false,
        monthMap,
        dayMap,
        alternateDayMap,
    };

    var el, selectedDate, yearView = false;

    function getFirstDayOfMonth(currentDate) {
        var thisDate = currentDate.getMonth() + 1 + "/1/" + currentDate.getFullYear();
        return new Date(thisDate);
    }

    function getLastDayOfMonth(currentDate) {
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    }

    function getLastMonthLastDay(currentDate) {
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        if (month === 0) {
            year -= 1;
            month = 12;
        }
        return new Date(year, month, 0);
    }

    function generateWeekData(currentDate, weekNo) {
        var firstDay = getFirstDayOfMonth(currentDate);
        var firstDayDate = firstDay.getDate();
        var lastDay = getLastDayOfMonth(currentDate);
        var lastDayFromLastMonth = getLastMonthLastDay(currentDate).getDate();
        var days = [];
        var daysFromLastMonth = firstDay.getDay();
        if (settings.startOnMonday) {
            daysFromLastMonth = daysFromLastMonth - 1;
        }
        var daysFromNextMonth = 1;
        if (weekNo === 1) {
            var dayFromLastMonth = daysFromLastMonth - 1 < 0 ? 6 + daysFromLastMonth : daysFromLastMonth - 1;
            if (dayFromLastMonth < 6) {
                for (daysFromLastMonth; dayFromLastMonth >= 0; dayFromLastMonth--) {
                    var dateObj = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth() - 1,
                        lastDayFromLastMonth - dayFromLastMonth
                    );
                    days.push(dateObj);
                }
            }

            var daysLength = 7 - days.length;
            for (var monthDate = 0; monthDate < daysLength; monthDate++) {
                var dateObj = new Date(
                    firstDay.getFullYear(),
                    firstDay.getMonth(),
                    firstDayDate + monthDate
                );
                days.push(dateObj);
            }
        } else {
            var startWeekFrom = (weekNo - (daysFromLastMonth < 0 ? 2 : 1)) * 7 - daysFromLastMonth;
            for (var i = 1; i <= 7; i++) {
                if (startWeekFrom + i <= lastDay) {
                    var dateObj = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        startWeekFrom + i
                    );
                    days.push(dateObj);
                } else {
                    var dateObj = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth() + 1,
                        daysFromNextMonth++
                    );
                    days.push(dateObj);
                }
            }
        }
        return days;
    }

    /**
     * generate month data
     */
    function generateMonthData(currentDate)
    {
        var lastMonthLast    = getLastDayOfMonth(currentDate).getDate();
        var lastDayFromMonth = getLastDayOfMonth(currentDate).getDate();
        var weeks            = parseInt(lastMonthLast / 7) + 1;

        var monthData = [];
        for (var weekNo = 1; weekNo <= weeks; weekNo++) {
            monthData.push(generateWeekData(currentDate, weekNo));
        }
        var lastBlock = monthData[monthData.length - 1];
        var lastDayInBlock = lastBlock[lastBlock.length - 1].getDate();

        if (lastDayInBlock < lastDayFromMonth && lastDayFromMonth - lastDayInBlock < 7) {
            monthData.push(generateWeekData(currentDate, weekNo));
        }

        // return response
        return monthData;
    }

    /**
     * generate today button
     */
    function generateTodayButton()
    {
        // return response
        return ('<div class="special-buttons">' + '<button class="today-button">' + settings.todayButtonContent + "</button>" + "</div>" );
    }

    /**
     * generate dropdown year
     */
    function generateYearHeaderDOM(currentDate)
    {
        // get current year
        var current_year = new Date().getFullYear();
        var allowed_year = current_year + 3;

        var str = '<div class="buttons-container">' + (settings.enableMonthChange && settings.enableYearView ? '<button class="prev-button">' + settings.prevButton + "</button>" : "") + '<span class="label-container year-label">';

        if (settings.showYearDropdown) {
            str += "" + '<select class="year-dropdown">';
            for (var i = current_year; i <= allowed_year; i++) {
                if (i === currentDate.getFullYear()) {
                    str += '<option selected="selected" value="' + i + '">' + i + "</option>";
                } else {
                    str += '<option value="' + i + '">' + i + "</option>";
                }
            }
            str += "</select>";
        } else {
            str += currentDate.getFullYear();
        }

        str += "</span>" + (settings.enableMonthChange && settings.enableYearView ? '<button class="next-button">' + settings.nextButton + "</button>" : "") + "</div>";

        // return content
        return str;
    }

    /**
     * generate dropdown month
     */
    function generateMonthDOM(currentDate)
    {
        var str = "";

        str += '<div class="months-wrapper">';

        for (var month in settings.monthMap) {
            if (settings.monthMap.hasOwnProperty(month)) {
                var showThreeMonthsInARow = "";
                showThreeMonthsInARow = settings.showThreeMonthsInARow ? " one-third" : "";
                str += '<span class="month' + showThreeMonthsInARow + '" data-month="' + month + '" data-year="' + currentDate.getFullYear() + '"><span>' + settings.monthMap[month] + "</span></span>";
            }
        }

        str += "</div>";
        return str;
    }

    function generateMonthHeaderDOM(currentDate)
    {
        return ('<div class="buttons-container">' +
            (settings.enableMonthChange ? '<button class="prev-button">' + settings.prevButton + "</button>" : "") + '<span class="label-container month-container">' + '<span class="month-label">' + settings.monthMap[currentDate.getMonth() + 1] +
      "</span>" + settings.monthYearSeparator + '<span class="year-label">' + currentDate.getFullYear() + "</span>" + "</span>" + (settings.enableMonthChange ? '<button class="next-button">' + settings.nextButton + "</button>" : "") + "</div>");
    }

    function generateWeekHeaderDOM(currentDate) {
        const { classes: weekClasses, data: weekData } = settings.customWeekProps(0);
        let dataStr = "";

        if (Object.keys(weekData)) {
            Object.keys(weekData).forEach((item) => {
                dataStr += ` data-${item}="${weekData[item]}" `;
            });
        }

    var str = "";
    str += '<div class="weeks-wrapper header">';
    str +=
      '<div class="week' +
      (settings.startOnMonday ? " start-on-monday" : "") +
      (weekClasses ? " " + weekClasses : "") +
      '" data-week-no="' +
      0 +
      '"' +
      dataStr +
      ">";

    for (var weekDay in settings.dayMap) {
      if (settings.dayMap.hasOwnProperty(weekDay)) {
        const { classes, data } = settings.customDateHeaderProps(weekDay);
        let dataStr = "";
        if (Object.keys(data)) {
          Object.keys(data).forEach((item) => {
            dataStr += ` data-${item}="${data[item]}" `;
          });
        }
        str +=
          '<div class="day header' +
          (classes ? " " + classes : "") +
          '" data-day="' +
          weekDay +
          '"' +
          dataStr +
          "  >" +
          (typeof settings.formatWeekDay === "function"
            ? settings.formatWeekDay(weekDay)
            : settings.dayMap[weekDay].substring(0, settings.weekDayLength)) +
          "</div>";
      }
    }

    str += "</div>";
    str += "</div>";
    return str;
  }

    function generateWeekDOM(monthData, currentDate) {
        var str = '<div class="weeks-wrapper">';

        monthData.forEach(function (week, weekNo) {
            const { classes, data } = settings.customWeekProps(weekNo);
            let dataStr = "";
            if (Object.keys(data)) {
                Object.keys(data).forEach((item) => {
                    dataStr += ` data-${item}="${data[item]}" `;
                });
            }

            str += '<div class="week' + (settings.startOnMonday ? " start-on-monday" : "") + (classes ? " " + classes : "") + '" data-week-no="' + (weekNo + 1) + '"' + dataStr + ">";

            week.forEach(function (day, dayNo) {
                var disabled = false;
                // if (day.getMonth() !== currentDate.getMonth()) disabled = true;
                if (
                    (settings.min && settings.min > day) || 
                    (settings.max && settings.max < day) || 
                    (settings.disable && 
                    typeof settings.disable === "function" &&
                    settings.disable(day))
                ) {
                    disabled = true;
                }
                disabled = disabled ? " disabled" : "";

                var selected = false;
                if (selectedDate) {
                    if (day == selectedDate.toString()) selected = true;
                    selected = selected ? " selected" : "";
                } else {
                    selected = "";
                }

                var today = false;

                if (day == todayDate.toString()) today = true;
                today = today ? " today" : "";

                var dateDisabled = "ola";
                if (
                    (settings.min && settings.min > day) || 
                    (settings.max && settings.max < day) || 
                    (settings.disable && 
                    typeof settings.disable === "function" &&
                    settings.disable(day))
                ) {
                    dateDisabled = 'disabled="disabled" ';
                }

                const { classes, data } = settings.customDateProps(day);
                let dataStr = "";
                if (Object.keys(data)) {
                    Object.keys(data).forEach((item) => {
                        dataStr += ` data-${item}="${data[item]}" `;
                    });
                }

                // convert day to formatted
                var formatted_date = getFormattedDate(day);

                // generate single day
                str += '<div class="day' + disabled + selected + today + (classes ? " " + classes : "") + '" data-formatted_date=' + formatted_date + ' data-date="' + day + '" ' + dataStr + dateDisabled + " ><span>" + (typeof settings.formatDate === "function" ? settings.formatDate(day) : day.getDate()) + "</span></div>";
            });
            str += "</div>";
        });
        str += "</div>";
        return str;
    }

    // get formatted date
    function getFormattedDate(date)
    {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return year + '-' + month + '-' + day;
    }

    function generateDomString(monthData, currentDate)
    {
        var calendarDump = "";
        calendarDump += '<div class="calendar-box">';
        if (yearView) {
            calendarDump += '<div class="months-container">';
            calendarDump += generateYearHeaderDOM(currentDate);
            calendarDump += generateMonthDOM(currentDate);
            calendarDump += "</div>";
        } else {
            calendarDump += '<div class="weeks-container">';
            calendarDump += generateMonthHeaderDOM(currentDate);
            calendarDump += generateWeekHeaderDOM(currentDate);
            calendarDump += generateWeekDOM(monthData, currentDate);
            calendarDump += "</div>";
        }

        if (settings.showTodayButton) {
            calendarDump += generateTodayButton();
        }

        calendarDump += "</div>";
        return calendarDump;
    }

    function highlightDays() {
        var selectedElement = el.find(".selected");
        if (selectedElement.length > 0) {
            var date = new Date(selectedElement.data("date"));
            var weekDayNo = date.getDay();

            el.find(".week").each(function (i, elm) {
                jQuery(elm).find(".day:eq(" + (weekDayNo - (settings.startOnMonday ? 1 : 0)) + ")").addClass("highlight");
            });
        }
    }

    function highlightWeek() {
        el.find(".selected").parents(".week").addClass("highlight");
    }

    function renderToDom(currentDate)
    {
        // get current date
        var activeDate = currentDate.setMonth(currentDate.getMonth() + 0);

        // get min allow date
        var allow_date = new Date();
        min_allow_date = allow_date.getTime();

        // get max allow date
        var max_allow_date = new Date();
        max_allow_date = max_allow_date.setMonth(max_allow_date.getMonth() + 36);

        // check date is valid
        var currentDate = (activeDate > max_allow_date) ? allow_date : currentDate;

        var monthData = generateMonthData(currentDate);
        el.html(generateDomString(monthData, currentDate));
        if (settings.highlightSelectedWeekday) {
            highlightDays();
        }
        if (settings.highlightSelectedWeek) {
            highlightWeek();
        }
    }

    $.fn.updateCalendarOptions = function (options) {
        var updatedOptions = $.extend(settings, options);
        var calendarInitFn = $.fn.calendar.bind(this);
        calendarInitFn(updatedOptions);
    };

    $.fn.calendar = function (options) {
        settings = $.extend(defaults, options);
        if (settings.startOnMonday) {
            settings.dayMap = settings.alternateDayMap;
        }

        if (settings.min) {
            settings.min = new Date(settings.min);
            settings.min.setHours(0);
            settings.min.setMinutes(0);
            settings.min.setSeconds(0);
        }

        if (settings.max) {
            settings.max = new Date(settings.max);
            settings.max.setHours(0);
            settings.max.setMinutes(0);
            settings.max.setSeconds(0);
        }

        // set allow date range
        var currentYear    = new Date();
        var allow_min_year = currentYear.getFullYear();
        var allow_max_year = currentYear.getFullYear() + 3;
        var current_month  = currentYear.getMonth();

        el = jQuery(this);
        var currentDate;

        if (settings.date) {
            if (typeof settings.date === "string") {
                selectedDate = new Date(settings.date);
            } else {
                selectedDate = settings.date;
            }
            selectedDate.setHours(0, 0, 0, 0);
            currentDate = selectedDate;
        } else {
            currentDate = todayDate;
        }

        window.currentDate = currentDate;

        renderToDom(currentDate);

        if (settings.enableMonthChange) {
            jQuery(this).on('click', '.weeks-container .prev-button', function (e) {
                currentDate = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1
                );
                settings.onClickMonthPrev(currentDate);
                renderToDom(currentDate);
            });

            // on click week change month
            jQuery(this).on('click', '.weeks-container .next-button', function (e) {
                // get data
                var selectedYear  = currentDate.getFullYear();
                var selectedMonth = currentDate.getMonth();

                // match condition
                if(selectedYear >= allow_min_year && selectedYear <= allow_max_year) {
                    if(selectedYear == allow_max_year) {
                        if(selectedMonth < current_month) {
                            currentDate = new Date(
                                currentDate.getFullYear(),
                                currentDate.getMonth() + 1,
                                1
                            );
                            settings.onClickMonthPrev(currentDate);
                            renderToDom(currentDate);
                        } else {
                            var reSetMonth = new Date();
                            currentDate = reSetMonth;
                            settings.onClickMonthPrev(reSetMonth);
                            renderToDom(reSetMonth);
                        }
                    } else {
                        currentDate = new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth() + 1,
                            1
                        );
                        settings.onClickMonthPrev(currentDate);
                        renderToDom(currentDate);
                    }
                } else {
                    var reSetMonth = new Date();
                    currentDate = reSetMonth;
                    settings.onClickMonthPrev(reSetMonth);
                    renderToDom(reSetMonth);
                }
            });
        }

        // on click day selection
        jQuery(this).on('click', '.weeks-container .day', function (e) {
            // get is diabled or not
            var is_active_date = jQuery(this).attr('disabled');

            // check date is active
            if(is_active_date != 'disabled') {
                // selection date
                jQuery('.day').removeClass('selected');
                jQuery(this).addClass('selected');

                // get selected date
                var formated_date = jQuery(this).attr('data-formatted_date');

                // set value in field
                jQuery('input[name=travel_date]').val(formated_date);
                jQuery('.select_book_now_date').val(formated_date);
            }
        });

        if (settings.enableMonthChange && settings.enableYearView) {
            el.off("click", ".month-container").on("click", ".month-container", function (e) {
                // e.preventDefault();
                yearView = true;
                currentDate = new Date(currentDate.getFullYear(), 0, 1);
                settings.onShowYearView(currentDate);
                renderToDom(currentDate);
            });

            el.off("click", ".months-container .month").on("click", ".months-container .month", function (e) {
                // e.preventDefault();
                var monthEl       = $(this);
                var month         = monthEl.data("month");
                var year          = monthEl.data("year");
                var selectedMonth = new Date(year, month - 1, 1);
                settings.onChangeMonth(selectedMonth);
                currentDate = selectedMonth;
                yearView = false;
                renderToDom(currentDate);
            });

            el.off("click", ".months-container .prev-button").on("click", ".months-container .prev-button", function (e) {
                // e.preventDefault();
                currentDate = new Date(currentDate.getFullYear() - 1, 0, 1);
                settings.onClickYearPrev(currentDate);
                settings.onSelectYear(currentDate);
                renderToDom(currentDate);
            });

            el.off("click", ".months-container .next-button").on("click", ".months-container .next-button", function (e) {
                // e.preventDefault();
                currentDate = new Date(currentDate.getFullYear() + 1, 0, 1);
                settings.onClickMonthNext(currentDate);
                settings.onSelectYear(currentDate);
                renderToDom(currentDate);
            });

            el.off("change", ".months-container .year-dropdown").on("change", ".months-container .year-dropdown", function (e) {
                // e.preventDefault();
                var year = $(this).val();
                currentDate = new Date(year, 0, 1);
                settings.onSelectYear(currentDate);
                renderToDom(currentDate);
            });
        }

        if (settings.showTodayButton) {
            el.off("click", ".today-button").on("click", ".today-button", function (e) {
                // e.preventDefault();
                currentDate = todayDate;
                selectedDate = todayDate;
                settings.onClickToday(todayDate);
                settings.onClickDate(todayDate);
                yearView = false;
                renderToDom(currentDate);
            });
        }

        this.getSelectedDate = function () {
            return selectedDate;
        };

        return this;
    };
})(jQuery);
