<template>
  <div class="root a-grid">
    <div v-for="resource in resourceGroups">
      <day-header class="resource-header" :headerTimes="dayArray"></day-header>
      <div class="time-row" v-for="name in resource.resourceNames">
        <div class="bordered day-cell">{{name}}</div>
        <div class="bordered day-cell" v-for="day in dayArray" ref="daycell">
          <div class="day-half">
            <span class="time-of-day-span">AM</span>
            <div v-html="getEventElement(name, day, 'am')"></div>
          </div>
          <div class="day-half">
            <span class="time-of-day-span">PM</span>
            <div v-html="getEventElement(name, day, 'pm')"></div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import dayHeader from './dayHeader' // despite the name, I believe it can be used for week headings too
import moment from 'moment' 

export default {
 props: {
    // startDate: {},
    options: {},
    resourceGroups: {},
    weekStart: {
      type: Object,
      default: () => { 
        return moment().startOf('isoweek')
      }
    },
    weekLength: {}
  },
  
  computed: {
    weekEnd () {
      //TODO: would probably be best to pass this in (and into header.vue) rather than calculate it here
      return this.weekStart.clone().add(this.weekLength - 1, 'd')
    },

    dayArray () {
      let days = []
      let currentDay = this.weekStart.clone()
      let len = this.weekLength

      for(let i = 0; i < len; i++) {
        days.push(currentDay.format('ddd DD MMM'))
        currentDay.add(1, 'd')
      }
      return days
    },

    weeksEvents () {
      let weekCurrentDate = this.weekStart.clone()
      let weekEndDate = this.weekEnd.clone()
      let events = []

      while (weekCurrentDate <= weekEndDate) {
        let formattedDate = weekCurrentDate.format('YYYY-MM-DD')
        events.push({
          date: formattedDate, 
          events: this.aDaysEvents(formattedDate)
        })
        weekCurrentDate.add(1, 'd')
      }
      return events;
    },
  },
  components: {
    'day-header': dayHeader
  },
  methods: {
    aDaysEvents (todaysDateString) {
      //taken from todaysEvetns in day.vue to test it out. if it works move it to another file or something to avoid reuse

      let todaysEvents = []

      this.options.resources.groups.map((item) => {
        var filteredEvents = _.filter(item.events, function (event) {
          return event.date === todaysDateString
        })
        
        if(filteredEvents.length > 0) todaysEvents.push(filteredEvents)
      })

      return _.flatten(todaysEvents)
    },

    getEventElement (resourceName, inDate, timeOfDay) {
      let formattedDate = moment(inDate, 'ddd DD MMM').format('YYYY-MM-DD')
      let todaysEvents = _.find(this.weeksEvents, {date: formattedDate})
      let resourcesEvents = _.filter(todaysEvents.events, {resourceName: resourceName})
      let timePeriodStart = moment('12:00am', 'h:mma')
      let timePeriodEnd = moment('12:00pm', 'h:mma')

      if(timeOfDay === 'pm') {
        //if PM override timeStart and timeEnd
        timePeriodStart = moment('12:00pm', 'h:mma')
        timePeriodEnd = moment('12:00am', 'h:mma').add(1, 'd')
      }

      let eventsInTimePeriod = _.filter(resourcesEvents, function (event) {
        let eventStartTime = moment(event.startTime, 'h:mma')
        return eventStartTime > timePeriodStart && eventStartTime <= timePeriodEnd
      })

      if(eventsInTimePeriod.length < 1) return

      let elem = '<div class="day-event" style="background-color: #'+eventsInTimePeriod[0].color+'; color: '+eventsInTimePeriod[0].textColor+ ';">'

      _.forEach(eventsInTimePeriod, ((event) => {
        elem += '<span>' + event.type + ' - ' + event.title + '</span><br>'
      }))
      elem += '</div>'

      return elem
    }
  }
}
</script>

<style>
  .day-half {
    height: 50%;
    outline: 1px solid grey;
    text-align: left;
    position: relative;
  }

  .day-cell {
    flex: 1;
    height: 75px;
    text-align: center;
    vertical-align: middle;
    position: relative;
    min-width: 45px;
  }

  .day-event {
    background-color: lightblue;
    position: absolute;
    right: 0;
    top: 1;
    z-index: 1;
    width: 85%;
    overflow: hidden;
    max-height: 90%; 
    border: 2px solid black;
    border-radius: 4px;  
  }

  .time-of-day-span {
    position: absolute;
    left: 1;
    top: 1;
    z-index: 1;
    background-color: white;
    outline: 1px solid lightgrey;
    width: 10%;
    text-align: center;
    min-width: 30px;
  }
</style>
