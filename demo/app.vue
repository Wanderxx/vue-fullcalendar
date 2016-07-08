<template>
  <div>
  	<p>
  		Here you can see the demo of my vue-fullcalendar, no jquery fullcalendar.js required.
  	</p>
    <full-calendar class="test-fc" :events="fcEvents"></full-calendar>
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
      title : 'Sunny 请假',
      start : '2016-06-30'
    },
    {
      title : 'Sunny more',
      start : '2016-06-30'
    },
    {
      title : 'Sunny 发财',
      start : '2016-07-01'
    },
    {
      title : 'Michelle 旅游',
      start : '2016-07-01',
      end   : '2016-07-02'
    },
    {
      title : 'Tao yoyo',
      start : '2016-07-02'
    },
    {
      title : 'AMY 请假',
      start : '2016-07-03',
      end   : '2016-07-04'
    },
    {
      title : 'BEN 出去玩',
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