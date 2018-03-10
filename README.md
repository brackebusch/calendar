Demo: https://brackebusch.github.io/calendar/
Live: http://www.superiorsystems.com/calendar?key=karin


# Calendar – Helping Small Businesses Schedule Clients

This application is designed as a plugin for those who seek to set hours of availability for people to schedule appointments. The application will have three fundamental pieces displayed on a single screen (MVPs):
1.	A rendered calendar with the ability to select timeslots for an appointment
2.	An options window for setting “restrictions” (set by the owner of the calendar) as to what days and timeslots are available for an appointment to be scheduled by a potential client (length of appointments, frequency of appointments, breaks, etc.)
3.	A limiting factor restricting timeslots already booked by a user. This will be interactive in that as a user clicks on the calendar to book an appointment the restrictions values will change.
The target audience will be individuals who have a business and wish to give their website functionality where clients can schedule appointments. Appointment openings will be set by the business, and then further updated as clients book open appointments.

## Technical Details
The challenge of this project is the interaction between what times should be allowed, what times slots are taken, and what times slots are open. I will attempt to accomplish this by generating an array of open time slots, and then removing from that array taken time slots, and then rendering to the calendar what remains. Technologies used will be Javascript primarily, HTML, and a bit of CSS. Google calendar offers similar functionality where people can book and accept appointments, but requires both parties to utilize Google software. This will free users from a dependency on Google accounts.

## Timeline to Completion
* Day 1: Style and render page with 2 forms and a calendar – most likely used from a public API
* Day 2: Create logic for setting opening timeslots in calendar
* Day 3: Render open time slots in calendar with click functionality
* Day 4: Display blocked timeslots per calendar interactions

## Bonus Features
Add ability to interact with blocked days so that the calendar changes as a user adds or removes time blocks from the “taken days” sections of the website. Display taken events on page with a unique styling that prevents them from being selected

