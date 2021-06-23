/*const testEmployee = {firstName: "", familyName: "", title: "", payPerHour: 0, timeInEvents: [], timeOutEvents: []}

function createEmployeeRecord(array){
    testEmployee.firstName = array[0];
    testEmployee.familyName = array[1];
    testEmployee.title = array[2];
    testEmployee.payPerHour = array[3];

  return testEmployee;
}
createEmployeeRecord(["Gray", "Worm", "Security", 1])*/

let createEmployeeRecord = function(array){
  return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
  }
}

let createEmployeeRecords = function(array){
  return array.map(e => {
    return createEmployeeRecord(e);
  })
}


let createTimeInEvent = function(e, dateTime){
  let [date, hour] = dateTime.split(' ')

  e.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
  })

  return e
}

let createTimeOutEvent = function(e, dateTime){
  let [date, hour] = dateTime.split(' ')

  e.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
  })

  return e
} 

let hoursWorkedOnDate = function(e, soughtDate){
  let inEvent = e.timeInEvents.find(function(e){
      return e.date === soughtDate
  })

  let outEvent = e.timeOutEvents.find(function(e){
      return e.date === soughtDate
  })

  return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(e, dateSought){
  let rawWage = hoursWorkedOnDate(e, dateSought)
      * e.payPerHour
  return parseFloat(rawWage.toString())
}

let allWagesFor = function(e){
  let eligibleDates = e.timeInEvents.map(function(e){
      return e.date
  })

  let payable = eligibleDates.reduce(function(memo, d){
      return memo + wagesEarnedOnDate(e, d)
  }, 0)

  return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
return srcArray.find(function(rec){
  return rec.firstName === firstName
})
}

let calculatePayroll = function(arrayOfEmployeeRecords){
  return arrayOfEmployeeRecords.reduce(function(memo, rec){
      return memo + allWagesFor(rec)
  }, 0)
}