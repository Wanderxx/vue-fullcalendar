<template>
  <div>
  	<p>
  		Here is the demo of vue-fullcalendar, no jquery fullcalendar.js required!
  	</p>
    <full-calendar class="test-fc" :events="fcEvents" lang="en"></full-calendar>
  </div>
</template>
<script>
let demoEvents = [
    {
      title : 'Sunny 628-630',
      start : '2016-06-28',
      end : '2016-06-30'
    },
    {
      title : 'Sunny 629-630',
      start : '2016-06-29',
      end : '2016-06-30'
    },
    {
      title : 'Sunny OoO',
      start : '2016-06-30'
    },
    {
      title : 'Sunny more',
      start : '2016-06-30'
    },
    {
      title : 'Sunny swim',
      start : '2016-07-01'
    },
    {
      title : 'Michelle trip',
      start : '2016-07-01',
      end   : '2016-07-02'
    },
    {
      title : 'Tao yoyo',
      start : '2016-07-02'
    },
    {
      title : 'AMY OoO',
      start : '2016-07-03',
      end   : '2016-07-04'
    },
    {
      title : 'BEN OoO',
      start : '2016-07-06',
      end   : '2016-07-08'
    }
  ]

export default {
	data () {
		return {
      name:'Sunny!',
      fcEvents : demoEvents
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