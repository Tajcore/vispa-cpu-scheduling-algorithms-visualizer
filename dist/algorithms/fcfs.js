
const fcfc_CalcTime = (inputTable, totalExectuteTime) => {
    $.each(inputTable, function (key, value) {
        if (key == 0) return true;
        $(value.children[3]).text(totalExectuteTime);
  
        var executeTime = parseInt($(value.children[2]).children().first().val());
        totalExectuteTime += executeTime;
      });
    
}


const fcfs_Draw = (inputTable,th,td) =>{
    $.each(inputTable, function (key, value) {
        if (key == 0) return true;
        var executeTime = parseInt($(value.children[2]).children().first().val());
        th +=
          '<th style="height: 60px; width: ' +
          executeTime * 20 +
          'px;">P' +
          (key - 1) +
          "</th>";
        td += "<td>" + executeTime + " sec</td>";
      });
  
      $("fresh").html(
        '<table id="resultTable"><tr>' + th + "</tr><tr>" + td + "</tr></table>"
      );
}



export {fcfs_Draw, fcfc_CalcTime}