import * as utility from "../utilities/utility.js";
/*
  This method aims to calculate the service times for each process queued up for a shortest-job-first scheduling
*/
const sjf_CalcTime = (inputTable, sumExecutionTime) => {
  // Initialize Execution Times Array
  var list_of_execution_times = [];

  // Extract each row's priority and execution time
  for (var i = 1; i < inputTable.length; i++) {
    var row = inputTable[i];
    list_of_execution_times[i - 1] = parseInt(
      row.children[2].children[0].value
    );
  }

  // Determine the next process to schedule based off the current shortest execution time
  var currentIndex = -1;
  for (var i = 0; i < list_of_execution_times.length; i++) {
    currentIndex = utility.getNextIndex(currentIndex, list_of_execution_times);

    if (currentIndex == -1) return;

    var row = inputTable[currentIndex + 1];
    row.children[3].textContent = sumExecutionTime;
    sumExecutionTime += list_of_execution_times[currentIndex];
  }
};

/*
  This method aims to generate the Ghantts Table for the Shortest Job First Process Scheduling 
*/
const sjf_Draw = (inputTable, th, td) => {
  // Initialize List of Execution Times
  var list_of_execution_times = [];

  // Extracts Execution Time From Each Process

  for (var i = 1; i < inputTable.length; i++) {
    var row = inputTable[i];
    var executeTime = parseInt(row.children[2].children[0].value);
    list_of_execution_times[i - 1] = { executeTime: executeTime, P: i - 1 };
  }

  // Sorts list of exection time in ascending order of burst time

  list_of_execution_times.sort(function (a, b) {
    if (a.executeTime == b.executeTime) return a.P - b.P;
    return a.executeTime - b.executeTime;
  });

  var sumExecutionTime = 0;

  // Generates Table Header and Data for Ghantt Chart
  list_of_execution_times.forEach((value, index) => {
    th +=
      '<th style="height: 60px; width: ' +
      value.executeTime * 50 +
      'px;">P' +
      value.P +
      "</th>";
    td += "<td>" + sumExecutionTime + " sec </td>";
    sumExecutionTime += value.executeTime;
  });

  td += "<td>" + sumExecutionTime + " sec </td>";

  document.querySelector("#timeline").innerHTML =
    '<table id="resultTable" style="width: 70%"><tr>' +
    th +
    "</tr><tr>" +
    td +
    "</tr></table>";
};

export { sjf_Draw, sjf_CalcTime };
