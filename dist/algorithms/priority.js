import * as utility from "../utilities/utility.js";

/*
  This method aims to calculate the service times for each process queued up for a priority scheduling
*/
const priority_CalcTime = (inputTable, sumExecutionTime) => {
  // Initialize Priority and Execution Times Array
  var list_of_execution_times = [];
  var list_of_priiorities = [];

  // Extract each row's priority and execution time
  for (var i = 1; i < inputTable.length; i++) {
    var row = inputTable[i];
    list_of_execution_times[i - 1] = parseInt(
      row.children[2].children[0].value
    );
    list_of_priiorities[i - 1] = parseInt(row.children[4].children[0].value);
  }

  var currentIndex = -1;

  for (var i = 0; i < list_of_execution_times.length; i++) {
    currentIndex = utility.getNextPriority(currentIndex, list_of_priiorities);

    if (currentIndex == -1) return;

    inputTable[currentIndex + 1].children[3].textContent = sumExecutionTime;

    sumExecutionTime += list_of_execution_times[currentIndex];
  }
};

/*
  This method aims to generate the Ghantts Table for the Priority Process Scheduling 
*/
const priority_Draw = (inputTable, th, td) => {
  // Initialize List of Execution Times
  var list_of_execution_times = [];

  // Extract execution time for each process
  for (var i = 1; i < inputTable.length; i++) {
    var row = inputTable[i];
    var executeTime = parseInt(row.children[2].children[0].value);
    var priority = parseInt(row.children[4].children[0].value);
    list_of_execution_times[i - 1] = {
      executeTime: executeTime,
      P: i - 1,
      priority: priority,
    };
  }

  // Sort List of Execution Time in Descending Order by priority
  list_of_execution_times.sort(function (a, b) {
    if (a.priority == b.priority) return a.P - b.P;
    return b.priority - a.priority;
  });

  var sumExecutionTime = 0;
  list_of_execution_times.forEach((value, index) => {
    td += "<td>" + sumExecutionTime + " sec </td>";
    sumExecutionTime += value.executeTime;

    th +=
      '<th style="height: 60px; width: ' +
      value.executeTime * 50 +
      'px;">P' +
      value.P +
      "</th>";
  });
  td += "<td>" + sumExecutionTime + " sec </td>";

  document.querySelector("#timeline").innerHTML =
    '<table id="resultTable" style="width: 70%"><tr>' +
    th +
    "</tr><tr>" +
    td +
    "</tr></table>";
};

export { priority_Draw, priority_CalcTime };
