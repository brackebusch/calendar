Demo: https://brackebusch.github.io/calendar/
Live: http://www.superiorsystems.com/calendar?key=karin


# Calendar – Helping Small Businesses Schedule Clients

This application is designed as a plugin for those who seek to set hours of availability for people to schedule appointments. The target audience is small business owners who wish to add appointment scheduling functionality to their website. Appointment openings will be set by the business, and then further updated as clients book and/or chancel appointments.
There are two fundamental components to this application: 
1.	A rendered calendar with the ability to select timeslots for an appointment (for users)
2.	An options window for setting “restrictions” as to what days and timeslots are available for an appointment to be scheduled by a potential client, i.e. length of appointments, frequency of appointments, breaks, etc. (can only been seen and edited by admin)

## Technical Details
The core of this application is generating an array of “events” (appointments) which will render to the calendar. After constraints have been established, the various input fields are evaluated to populate the calendar with open appointments. 
This application is written in JavaScript, jQuery, HTML, and CSS, and as this is only a demo of functionality no backend/database is used. Total time to completion was about four days, with the bulk of the time working though the “how” of integrating Full Calendar API.