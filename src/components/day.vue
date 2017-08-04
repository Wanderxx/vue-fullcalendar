<template>
  <div class="root">
    <div v-for="resource in resourceGroups">
      <day-header class="resource-header" :headerTimes="timeArray"></day-header>
      <div class="time-row" v-for="name in resource.resourceNames">
        <div class="bordered time-cell">{{name}}</div>
        <div class="bordered time-cell" v-for="time in timeArray" ref="timecell">
          <div v-html="getEventElement(name, time)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
import dayHeader from './dayHeader'
import timeFunc from './timeFunc'

// TODO: handle resize

export default {
  props: {
    startDate: {},
    options: {},
    resourceGroups: {}
  },
  data () { 
    return {
      timeSpanWidth: 80
    }
  },
  mounted () {
    this.initTimeSpanWidth()
  },
  computed: {
    timeArray () {
      let dayStartTime = moment(this.options.dayStartTime, 'h:m a')
      let dayEndTime = moment(this.options.dayEndTime, ['h:m a', 'H:m'])
      let currentTime = dayStartTime
      let times = []

      while(currentTime <= dayEndTime) {
        times.push(currentTime.format('h:mma'))
        currentTime.add(30, 'm')
      }

      return times
    },
    todaysEvents () {
      let todaysDateString = this.isoTodaysDateString
      let todaysEvents = []

      this.options.resources.groups.map((item) => {
        var filteredEvents = _.filter(item.events, function (event) {
          return event.date === todaysDateString
        })
        
        if(filteredEvents.length > 0) todaysEvents.push(filteredEvents)
      })

      return _.flatten(todaysEvents)
    },
    isoTodaysDateString () {
      return this.startDate.format('YYYY-MM-DD')
    }
  },
  components: {
    'day-header': dayHeader
  },
  methods: {
    initTimeSpanWidth: function () {      
      if(this.$refs.timecell == undefined) return
      this.timeSpanWidth = this.$refs.timecell[0].clientWidth + 1.5 // extra for borders
    },
    getEventElement: function (resourceName, time) {
      var dateString = this.isoTodaysDateString      

      let event = _.find(this.todaysEvents, function (event) {
        return event.resourceName === resourceName && event.startTime === time && event.date === dateString
      })

      if(event != undefined) {
        // TODO: Probably best to move this to a new component.
        let duration = event.duration ? 
          timeFunc.convertDurationToMinutes(event.duration) : 
          timeFunc.getDurationBetweenTimes(event.startTime, event.endTime)

        let pixelWidth = duration/30 * this.timeSpanWidth

        return '<div class="event" style="width: '+pixelWidth+'px;">' 
          + event.type + ' - ' + event.title + ' - ' + event.recipient 
          /// + ' || (duration: ' + duration + '. start/end: ' + event.startTime + '/' + event.endTime + '. width: ' + pixelWidth // debugging line
          + '</div>'
      }
    }
  }
}
</script>

<style>
  .event {
    min-width: 30px;
    min-height: 30px;
    max-height: 30px;
    z-index: 1;
    position: absolute;
    left: 0px;
    border: 1px solid black;
    margin-top: 10px;
    overflow:hidden; 
    background-color: lightblue;
  }
</style>
