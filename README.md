# Calendar – Helping Small Businesses Schedule Clients

This application is designed as a plugin for those who seek to set hours of availability for people to schedule appointments. Target audience is small business owners who wish to add appointment scheduling functionality to their website. Appointment openings will be set by the business, and then further updated as clients book and/or chancel appointments.
There are two fundamental components to this application: 
1.	A rendered calendar with the ability to select timeslots for an appointment (for users)
2.	An options window for setting “restrictions” as to what days and timeslots are available for an appointment to be scheduled by a potential client, i.e. length of appointments, frequency of appointments, breaks, etc. (can only been seen and edited by admin)

## Technical Details
The core challenge was generating an array of “events” (appointments) which will render to the calendar. After constraints have been established by the admin, the various input fields are evaluated to populate the calendar with open appointments. 
This application is written in JavaScript, jQuery, HTML, and CSS,  and as this is only a demo of functionality no backend/database is used. Total time to completion was about four days, with the bulk of the time working though the “how” of integrating Full Calendar API.

Demo: https://brackebusch.github.io/calendar/

![screenshot](https://user-images.githubusercontent.com/6962425/38648223-e2a79906-3da4-11e8-8ec9-1d64051bfc07.png)



