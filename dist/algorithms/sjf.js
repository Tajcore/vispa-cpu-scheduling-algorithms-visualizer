import * as utility from '../utilities/utility.js';
const sjf_CalcTime = (inputTable, totalExectuteTime) => {
    
    var exectuteTimes = [];
    $.each(inputTable, function (key, value) {
      if (key == 0) return true;
      exectuteTimes[key - 1] = parseInt(
        $(value.children[2]).children().first().val()
      );
    });

    var currentIndex = -1;
    for (var i = 0; i < exectuteTimes.length; i++) {
      currentIndex = utility.findNextIndex(currentIndex, exectuteTimes);

      if (currentIndex == -1) return;

      $(inputTable[currentIndex + 1].children[3]).text(totalExectuteTime);

      totalExectuteTime += exectuteTimes[currentIndex];
    }
 
}
const sjf_Draw = (inputTable,th,td) =>{
    var executeTimes = [];

    $.each(inputTable, function (key, value) {
      if (key == 0) return true;
      var executeTime = parseInt($(value.children[2]).children().first().val());
      executeTimes[key - 1] = { executeTime: executeTime, P: key - 1 };
    });

    executeTimes.sort(function (a, b) {
      if (a.executeTime == b.executeTime) return a.P - b.P;
      return a.executeTime - b.executeTime;
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
      '<table id="resultTable"><tr>' + th + "</tr><tr>" + td + "</tr></table>"
    );
 
}


export {sjf_Draw, sjf_CalcTime}