/*
  This method aims to generate the Ghantts Table for the Round Robin Process Scheduling 
*/
const robin_Draw = (inputTable, th, td) => {
  // Get Time Quantum Value from Input
  var quantumTime = document.querySelector("#quantum").value;

  //Initialize List of Execution Times
  var list_of_execution_times = [];

  // Extract Execution Times from Proccesses in Queue
  for (var i = 1; i < inputTable.length; i++) {
    var row = inputTable[i];
    var executeTime = parseInt(row.children[2].children[0].value);
    list_of_execution_times[i - 1] = { executeTime: executeTime, P: i - 1 };
  }

  var finished = false;
  var sumExecution = 0;

  // Generates Ghantt Chart for Round Robin by reducing the execution time of each process by the time quantum and processes them over
  while (!finished) {
    finished = true;

    list_of_execution_times.forEach((value, index) => {
      if (value.executeTime > 0) {
        th +=
          '<th style="height: 60px; width: ' +
          (value.executeTime > quantumTime ? quantumTime : value.executeTime) *
            50 +
          'px;">P' +
          value.P +
          "</th>";
        td += "<td>" + sumExecution + " sec</td>";
        sumExecution += parseInt(value.executeTime > quantumTime ? quantumTime : value.executeTime)
        value.executeTime -= quantumTime;
        finished = false;
      }
    });
  }
  td += "<td>" + sumExecution + " sec</td>";

  document.querySelector("#timeline").innerHTML =
    '<table id="resultTable" style="width: 70%"><tr>' +
    th +
    "</tr><tr>" +
    td +
    "</tr></table>";
};

export { robin_Draw };
