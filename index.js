<script>
$(document).ready(function () {
    $('#checkBtn').click(function() {
      checked = $("input[type=checkbox]:checked").length;
      if(!checked) {
        alert("You must check at least one day to Work.");
        return false;
      } else if (form.elements.dayStart.value > form.elements.dayEnd.value) {
        alert("You cannot end work earlier than you begin.");
        return false;
      }
    })
});

var form = document.querySelector("form");
form.addEventListener("submit", event => {
  event.preventDefault();
  let appLength, bufferLength = null;
  let dayStart = form.elements.dayStart.value;
  let dayEnd = form.elements.dayEnd.value;

  if (form.elements.appLengthFormat.value === "hours") {
    appLength = form.elements.appLength.value * 60
  } else {
    appLength = form.elements.appLength.value
  }

  if (form.elements.bufferLengthFormat.value === "hours") {
    bufferLength = form.elements.bufferLength.value * 60
  } else {
    bufferLength = form.elements.bufferLength.value
  }

  timeToBookInteger = parseInt(appLength) + parseInt(bufferLength);
  duration = moment.duration((parseInt(appLength) + parseInt(bufferLength)), 'minutes');

  const workingDays = [];
  for (let i = 0; i < 7; i++) {
    if (form.elements[i].checked) {
      workingDays.push(i);
    }
  }

  const startMin = Math.floor(form.elements.dayStart.valueAsNumber / 60000);
  const endMin = Math.floor(form.elements.dayEnd.valueAsNumber / 60000);

  const openHours = (m) => {
    m = m.minutes() + m.hours() * 60;
    return startMin < m && m < endMin 
  }

  const validAppointment = (m) => {
    return ( (workingDays.includes(m.day()) && openHours(m)) );
  }

  
  const startInt = form.elements.advanceNotice.value;
  const startType = form.elements.advanceNoticeFormat.value;
  let i = 0;
  const eventArr = [];

  let createMoment = moment().add(startInt, startType).startOf('hour')
  
  while (i < 20) {
    createMoment = moment(createMoment).add(timeToBookInteger, 'm')

    if (validAppointment(createMoment)) {
      eventArr.push({
          id: i,
          title: ("Appt " + i),
          start: createMoment,
          selected: false,
          backgroundColor: '#FFD8AA',
          textColor: '#804E15',
        })
    i++;
    }                
  }

  $('#calendar').fullCalendar({
    eventConstraint: {
          start: dayStart,
          end: dayEnd,
          dow: workingDays
      },
    defaultTimedEventDuration: duration,
    forceEventDuration: true,
    events: eventArr,
    // eventColor: '#FFD8AA',
    // eventTextColor: '#804E15',
    // eventLimit: true,
    eventClick: function(calEvent, jsEvent, view) {
      eventArr[calEvent.id].selected = !eventArr[calEvent.id].selected
      modifyEventValues();
    }                
  })          
});

const modifyEventValues = () => {
  for (let index = 0; index < eventArr.length; index++) {
    if(array[index].selected){
      arr[index].backgroundColor = 'gray';
    } else {
      arr[index].backgroundColor = '';
    }
  }
};

</script>