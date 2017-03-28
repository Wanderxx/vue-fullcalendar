<template>
  <div>
  	<p>
  		Here is the demo of vue-fullcalendar, no jquery fullcalendar.js required!
  	</p>
    <full-calendar class="test-fc" :events="fcEvents" :days-extend="daysExtend"
      first-day='1' locale="zh_CN" :weekEnd="weekEnd"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick">
        <template slot="fc-event-card" scope="p">
            <p><i class="fa">sadfsd</i> {{ p.event.title }} test</p>
        </template>
    </full-calendar>
  </div>
</template>
<script>
let weekEnd = [5,6];
let demoEvents = [
    {
      title : 'Lunfel',
      start : '2017-03-27',
      end : '2017-03-28'
    },
    {
      title : 'Lunfel1',
      start : '2017-03-27',
      end : '2017-03-28'
    },
    {
      title : 'Lunfel2',
      start : '2017-03-27',
      end : '2017-03-28'
    },
    {
      title : 'Lunfel3',
      start : '2017-03-27',
      end : '2017-03-28'
    }
  ];

export default {
	data () {
		return {
            name:'Sunny!',
            weekEnd,
            fcEvents : demoEvents,
            daysExtend: [
              {
                date: '2017-03-10',
                cssClass: ['red']
              }
            ]
        }
	},
  methods : {
    'changeMonth' (start, end, current) {
      console.log('changeMonth', start.format(), end.format(), current.format())
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