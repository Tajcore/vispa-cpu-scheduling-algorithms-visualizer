/*
  This method aims to calculate the service times for each process queued up for a first-come-first-serve scheduling
*/
const fcfc_CalcTime = (inputTable, sumExecutionTime) => {
  // Update Execution Time of Each Process based off Position in Queue

  for (var i = 1; i < inputTable.length; i++) {
    var row = inputTable[i];
    row.children[3].textContent = sumExecutionTime;
    sumExecutionTime += parseInt(row.children[2].children[0].value);
  }
};

/*
  This method aims to generate the Ghantts Table for the First Come First Serve Process Scheduling 
*/
const fcfs_Draw = (inputTable, th, td) => {

  var sumExecutionTime  = 0

  // Adds a table column for each process in order of entry in queue
  for (var i = 1; i < inputTable.length; i++) {
    var row = inputTable[i];    
    td += "<td>" + sumExecutionTime   + " sec</td>";
    var execution_time = parseInt(row.children[2].children[0].value);
    sumExecutionTime += execution_time;

    th +=
      '<th style="height: 60px; width: ' +
      execution_time* 50  +
      'px;">P' +
      (i - 1) +
      "</th>";
    
  }
  td += "<td>" + sumExecutionTime  + " sec</td>";

  document.querySelector("#timeline").innerHTML = '<table id="resultTable"><tr>' + th + "</tr><tr>" + td + "</tr></table>"

};

export { fcfs_Draw, fcfc_CalcTime };
