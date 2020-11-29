import * as utility from '../utilities/utility.js';

const priority_CalcTime = (inputTable, totalExectuteTime) => {
    var exectuteTimes = [];
    var priorities = [];

    $.each(inputTable, function (key, value) {
      if (key == 0) return true;
      exectuteTimes[key - 1] = parseInt(
        $(value.children[2]).children().first().val()
      );
      priorities[key - 1] = parseInt(
        $(value.children[4]).children().first().val()
      );
    });

    var currentIndex = -1;
    for (var i = 0; i < exectuteTimes.length; i++) {
      currentIndex = utility.findNextIndexWithPriority(currentIndex, priorities);

      if (currentIndex == -1) return;

      $(inputTable[currentIndex + 1].children[3]).text(totalExectuteTime);

      totalExectuteTime += exectuteTimes[currentIndex];
    }
  
}
const priority_Draw = (inputTable,th,td) => {
    
    var executeTimes = [];

    $.each(inputTable, function (key, value) {
      if (key == 0) return true;
      var executeTime = parseInt($(value.children[2]).children().first().val());
      var priority = parseInt($(value.children[4]).children().first().val());
      executeTimes[key - 1] = {
        executeTime: executeTime,
        P: key - 1,
        priority: priority,
      };
    });

    executeTimes.sort(function (a, b) {
      if (a.priority == b.priority) return a.P - b.P;
      return b.priority - a.priority;
    });

    $.each(executeTimes, function (key, value) {
      th +=
        '<th style="height: 60px; width: ' +
        value.executeTime * 20 +
        'px;">P' +
        value.P +
        "</th>";
      td += "<td>" + value.executeTime + "</td>";
    });

    $("fresh").html(
      '<table id="resultTable" style="width: 70%"><tr>' +
        th +
        "</tr><tr>" +
        td +
        "</tr></table>"
    );
 
}


export {priority_Draw, priority_CalcTime}