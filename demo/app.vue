<template>
  <div>
  	<p>
  		Here is the demo of vue-fullcalendar, no jquery fullcalendar.js required!
  	</p>
    <full-calendar class="test-fc" :events="fcEvents" 
      first-day='1' lang="en"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick">
    </full-calendar>
  </div>
</template>
<script>
let demoEvents = [
    {
      title    : 'Sunny 725-727',
      start    : '2016-07-25',
      end      : '2016-07-27',
      cssClass : 'family'
    },
    {
      title : 'Sunny 726-727',
      start : '2016-07-26',
      end : '2016-07-27',
      cssClass : ['home', 'work']
    },
    {
      title : 'Sunny 727-728',
      start : '2016-07-27',
      end : '2016-07-28'
    },
    {
      title : 'Sunny 728-730',
      start : '2016-07-28',
      end : '2016-07-30'
    },
  ]

export default {
	data () {
		return {
      name:'Sunny!',
      fcEvents : demoEvents
    }
	},
  methods : {
    'changeMonth' (start, end, current) {
      console.log('changeMonth', start, end, current)
    },
    'eventClick' (event, jsEvent, pos) {
       console.log('eventClick', event, jsEvent, pos)
    },
    'dayClick' (day, jsEvent) {
      console.log('dayClick', day, jsEvent)
    },
    'moreClick' (day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    }
  },
  components : {
    'full-calendar' : require('src/fullCalendar')
  }
}
</script>
<style lang='scss'>
  .app{
    color:green;
  }
</style>