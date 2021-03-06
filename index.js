/* eslint-disable */

$(document).ready(function () {
  $('#checkBtn').click(function () {
    let checked = $('input[type=checkbox]:checked').length
    if (!checked) {
      alert('You must check at least one day to Work.')
      return false
    } else if (form.elements.dayStart.value > form.elements.dayEnd.value) {
      alert('You cannot end work earlier than you begin.')
      return false
    } else if (form.elements.lunchStart.value > form.elements.lunchEnd.value) {
      alert('You need your strength, don\'t skip lunch =)')
      return false
    }
  })
})

$( function() {
  $( "#datepicker" ).datepicker();
} );


let form = document.querySelector('form')
const eventArr = []

form.addEventListener('submit', event => {
  event.preventDefault()
  eventArr.length = 0
  let appLength = null
  let bufferLength = null
  let dayStart = form.elements.dayStart.value
  let dayEnd = form.elements.dayEnd.value

  if (form.elements.appLengthFormat.value === 'hours') {
    appLength = form.elements.appLength.value * 60
  } else {
    appLength = form.elements.appLength.value
  }

  if (form.elements.bufferLengthFormat.value === 'hours') {
    bufferLength = form.elements.bufferLength.value * 60
  } else {
    bufferLength = form.elements.bufferLength.value
  }

  let timeToBookInteger = parseInt(appLength) + parseInt(bufferLength)
  let duration = moment.duration((parseInt(appLength) + parseInt(bufferLength)), 'minutes')

  const workingDays = []
  for (let i = 0; i < 7; i++) {
    if (form.elements[i].checked) {
      workingDays.push(i)
    }
  }

  const startMin = Math.floor(form.elements.dayStart.valueAsNumber / 60000)
  const endMin = Math.floor(form.elements.dayEnd.valueAsNumber / 60000)
  const lunchStartMin = Math.floor(form.elements.lunchStart.valueAsNumber / 60000)
  const lunchEndMin = Math.floor(form.elements.lunchEnd.valueAsNumber / 60000)

  const openHours = (m) => {
    m = m.minutes() + m.hours() * 60
    return (startMin <= m && m < lunchStartMin) || (lunchEndMin <= m && m < endMin)
  }

  const validAppointment = (m) => {
    return ((workingDays.includes(m.day()) && openHours(m)))
  }

  const startInt = form.elements.advanceNotice.value
  const startType = form.elements.advanceNoticeFormat.value
  let i = 0

  let createMoment = moment().add(startInt, startType).startOf('hour')
  let endDate = moment(form.elements[17].value)
  console.log(endDate)

  while (createMoment < endDate) {
    createMoment = moment(createMoment).add(timeToBookInteger, 'm')

    if (validAppointment(createMoment)) {
      eventArr.push({
        id: i,
        title: ('Available'),
        start: createMoment,
        selected: false,
        backgroundColor: '#7bed9f',
        textColor: '#000',
        borderColor: '#2ed573'
      })
      i++
    }
  }

  
let confirmContent = (calEvent) => {
  if (calEvent.selected) {
    return {
      animateFromElement: false,
      boxWidth: '30%',
      useBootstrap: false,
      animation: 'top',
      closeAnimation: 'bottom',
      title: "Cancel Appointment",
      content: ('Would you like to cancel your appointment on ' + eventArr[calEvent.id].start.format("dddd, MMMM Do, h:mm a") + "?"),
      buttons: {
        unschedule: {
          btnClass: "btn-red",
          text: "Yes Cancel",
          action: function() {
            eventArr[calEvent.id].selected = !eventArr[calEvent.id].selected
            renderEventValues()    
          }
            // $.alert('Appointment Canceled');
        },
        undoCancel: {
          text: "go back"
        },
      }
    } 
   } else {
      return {
      animateFromElement: false,        
      boxWidth: '30%',
      useBootstrap: false,
      animation: 'top',
      closeAnimation: 'bottom',      
      title: "Schedule Appointment",
      content: ('Would you like to book an appointment on ' + 
              eventArr[calEvent.id].start.format("dddd, MMMM Do, h:mm a") + 
              "? (Appointments are " + appLength + " " + form.elements.appLengthFormat.value + ")"),
      buttons: {
          bookAppointment: {
            btnClass: "btn-green",
            text: "Schedule",
            action: function() {
              eventArr[calEvent.id].selected = !eventArr[calEvent.id].selected
              renderEventValues()
                // $.alert('Appointment Scheduled');
            }
          },
          undo: {
            text: "cancel"
          },
        }
      }
    } 
} 

  $('#calendar').fullCalendar('removeEvents')
  $('#calendar').fullCalendar('renderEvents', eventArr, true)
  $('#calendar').fullCalendar({
    eventConstraint: {
      start: dayStart,
      end: dayEnd,
      dow: workingDays
    },
    timeFormat: 'h:mma',
    defaultTimedEventDuration: duration,
    forceEventDuration: true,
    // defaultView: 'week',
    header: {
      left: 'prev,next,today',
      center: 'title',
      right: 'agendaWeek,month'
    },
    defaultView: 'agendaWeek',
    allDaySlot: false,
    minTime: dayStart,
    maxTime: dayEnd,
    events: eventArr,
    height: "auto",
    eventMouseover: function( event, jsEvent, view ) {
      $(this).css('border-color', '#ffd32a');
      $(this).css('cursor', 'pointer');
     },
    eventMouseout: function( event, jsEvent, view ) {
      $(this).css('border-color', '#2ed573');
      $(this).css('cursor', 'default');      
     },
    eventClick: function (calEvent, jsEvent, view) {
      $.confirm(confirmContent(calEvent));
    }
  })
})

const renderEventValues = () => {
  for (let index = 0; index < eventArr.length; index++) {
    if (eventArr[index].selected) {
      eventArr[index].title = 'Booked'
      eventArr[index].backgroundColor = 'gray'
      eventArr[index].textColor = '#000'

      if (document.contains(document.getElementById(eventArr[index].id.toString()))) {
        document.getElementById(eventArr[index].id.toString()).remove()
      }

      // first remove any elements from the list, then repopulate it

      var listItem = document.createElement('li')
      listItem.id = eventArr[index].id
      var node = document.createTextNode(eventArr[index].start.format('dddd, MMMM Do YYYY, h:mm a'))
      listItem.appendChild(node)
      var element = document.getElementById('appointment-list')
      element.appendChild(listItem)
    } else {
      eventArr[index].title = 'Available'
      eventArr[index].backgroundColor = '#7bed9f'
      eventArr[index].textColor = '#000'
      eventArr[index].borderColor = '#2ed573'
      
      if (document.contains(document.getElementById(eventArr[index].id.toString()))) {
        document.getElementById(eventArr[index].id.toString()).remove()
      }
    }
  }
  $('#calendar').fullCalendar('removeEvents')
  $('#calendar').fullCalendar('renderEvents', eventArr, true)
}
