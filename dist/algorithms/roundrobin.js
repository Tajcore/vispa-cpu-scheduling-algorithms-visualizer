const robin_CalcTime = (inputTable, totalExectuteTime) => {
    
}
const robin_Draw = (inputTable,th,td) => {
  var quantum = $("#quantum").val();
  var executeTimes = [];

  $.each(inputTable, function (key, value) {
    if (key == 0) return true;
    var executeTime = parseInt($(value.children[2]).children().first().val());
    executeTimes[key - 1] = { executeTime: executeTime, P: key - 1 };
  });

  var areWeThereYet = false;
  while (!areWeThereYet) {
    areWeThereYet = true;
    $.each(executeTimes, function (key, value) {
      if (value.executeTime > 0) {
        th +=
          '<th style="height: 60px; width: ' +
          (value.executeTime > quantum ? quantum : value.executeTime) * 20 +
          'px;">P' +
          value.P +
          "</th>";
        td +=
          "<td>" +
          (value.executeTime > quantum ? quantum : value.executeTime) +
          "</td>";
        value.executeTime -= quantum;
        areWeThereYet = false;
      }
    });
  }
  $("fresh").html(
    '<table id="resultTable" style="width: 70%"><tr>' +
      th +
      "</tr><tr>" +
      td +
      "</tr></table>"
  );
};



export{robin_Draw, robin_CalcTime}