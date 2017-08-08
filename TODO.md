# TODO

* Change prop values to match the prop-value/propValue thing between passing and declaring
* Get start dates for month and week/day working better together. Figure out what should happen, I.E. should changing to month reset the date for week/day to start of that month, or keep it closer to what was looked at last
* Might need better handling of week start if first day of month falls on a saturday (ie july 31st is saturday, week goes from 26 mon - 30 fri)
* Add ability to add css classes for events
* Move js function files to new directory
* tidy components folder
* Should probably add an end date option for events
    * This would mean an update to how the end for week/day is calculated
    * Would need to make sure that week/day events can spread over multiple days
* Remove groups from options and make it a level higher as resources
* Add eslinting to project using standard formatting version
* Fix up display of event pop up so it's positioned absolutely in comparision to the day its for and make it wider
* Fix styling
    * Headings
    * Some common styling for headings, events etc
* Add button to go to current week/day/month (depending on what view it is on)
* Figure out how I'm gonna do functions in methods etc, either name: function() {}  or name () {}


## Styling TODO

* Day
    * <strike> Get first column to stand out like in the example </strike>
    * <strike>The other rows should be seperate for each time section, and a row for all time headings</strike>

* Handle responsiveness
* Handle text colour in individual events