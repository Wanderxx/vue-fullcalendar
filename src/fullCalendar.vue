<template>
  <div class="comp-full-calendar">
    <!-- header pick month -->
    <!-- :first-day="firstDay" -->
    {{colors}}

    <fc-header :current-month="currentMonth"
      
      :locale="locale"
      :startDate="computedStartDate"
      :weekStartDate="computedWeekStart"
      :initialTimeFrame="computedTimeFrame"
      :weekLength="options.weekLength"
      @changeMonth="emitChangeMonth"
      @changeDay="emitChangeDay"
      @changeWeek="emitChangeWeek"
      @changeTimeFrame="changeTimeFrame"
      >

      <!-- <div slot="header-left">
        <slot name="fc-header-left">
        </slot>
      </div> -->

      <!-- <div slot="header-right">
        <slot name="fc-header-right">
        </slot>
      </div> -->
    </fc-header>

    <template v-if="computedTimeFrame === 'day'">
      <day :startDate="computedStartDate"
        :options="options"
        :resourceGroups="resourceGroups"
        :colors="colors"
      ></day>
    </template>
    

    <template v-else-if="computedTimeFrame === 'week'">
      <week :resourceGroups="resourceGroups"
          :weekStart="computedWeekStart"
          :weekLength="options.weekLength"
          :options="options"
        ></week>
    </template>
<!-- :events="events" :showMore="showMore" :selectDay="selectDay" :morePos="morePos" -->
    <template v-else-if="computedTimeFrame === 'month'">
      <month :firstDay="firstDay"
              :locale="locale"
              :eventLimit="eventLimit"
              :currentMonth="currentMonth"
              :options="options"
              >
      </month> 
    </template>

    <template v-else>
      Select a time frame
    </template>

  </div>
</template>
 <script type="text/babel">
// TODO: go through this and clean it up a bit
import dateFunc from './components/dateFunc'
import moment from 'moment';
import EventCard from './components/eventCard.vue';
import Month from './components/month.vue'
import Day from './components/day.vue'
import Week from './components/week.vue'
import Vue from 'vue'

export default {
  props : {
    locale : {
      type : String,
      default : 'en'
    },
    firstDay : {
      type : Number | String,
      validator (val) {
        let res = parseInt(val);
        return res >= 0 && res <= 6
      },
      default : 0
    },
    options: Object,
    initialTimeFrame: {
      type: String,
      default: 'month'
    },
    initialStartDate: {
      type: Object,
      default: () => { 
        return moment() 
      }
    },
    initColorIndex: {
      default: 0
    }
  },
  components : {
    'event-card': EventCard,
    'fc-header' : require('./components/header'),
    'month': Month,
    'day': Day,
    'week': Week
  },
  data () {
    return {
      currentMonth : moment().startOf('month'),
      isLismit : true,
      eventLimit : 3,
      // showMore : true,
      // morePos : {
      //   top: 0,
      //   left : 0
      // },
      currentTimeFrame: '',
      currentStartDate: '', // This should probably be an object, but need to fix up check if so (in computed start date)
      currentWeekStart: '', // This should probably be an object, but need to fix up check if so (in computed start date)
      defaultColours: ['F1C40F', 'E74C3C', '3498DB', '1ABC9C'] // get colours from: http://flatcolors.net/palette/203-flat-wbuttons# or the colour array in app.vue options const
    }
  },
  created () {
    // assign color to event 
    this.assignColorToEvents()
  },
  computed: {
    // The variables with the 'computed' prefix are for variables which we pass in props from but don't want to change the props (Vue gives a warning)
    // There are three variables prefixes which relate to this 'initial' for the prop, 'current' for the data value, and 'computed' for the computed values
    // TODO: See if there is a better way of doing this. I think we could remove the data variables and just work with computed and props, but probably won't work with the get and set
    computedTimeFrame: {
      get: function () {
        return this.currentTimeFrame != '' ? this.currentTimeFrame : this.initialTimeFrame 
      },
      set: function (newValue) {
        this.currentTimeFrame = newValue
      }
    },
    computedStartDate: {
      get: function () {
        return this.currentWeekStart != '' ? this.currentWeekStart : this.initialStartDate
      },
      set: function (newValue) {
        this.currentWeekStart = newValue
      }
    },
    computedWeekStart: {
      get: function () {
        return this.computedStartDate.clone().startOf('isoweek')
      },
      set: function (newWeekStart) {
        this.computedStartDate = newWeekStart
      }
    },
    resourceGroups () {
      let resourceNamesByGroups = this.options.resources.groups.map((item) => {
        let definedResourceNames = item.resourceNames

        let eventResourceNames = item.events.map((event) => {
          return event.resourceName
        })

        return {
          type: [item.type],
          resourceNames: _.union(definedResourceNames, eventResourceNames).sort() // FIXME: sort doesnt sort with string number values
        }
      })
      return resourceNamesByGroups
    },
    colors () {
      return this.options.colors.length !== 0 ? this.options.colors : this.defaultColours
    }
  },
  methods : {
    assignColorToEvents () {
      let colors = this.colors
      let colorIndex = 0

      this.options.resources.groups.map((group) => {
        group.events.map((event, index) => {
          if(event.color === undefined) {
            event.color = colors[colorIndex % colors.length]
            colorIndex++
          }
        })
      })
    },
    emitChangeMonth (firstDayOfMonth) {
      console.log('first day of month', firstDayOfMonth)
      this.currentMonth = firstDayOfMonth

      let start = dateFunc.getMonthViewStartDate(firstDayOfMonth, this.firstDay);
      let end = dateFunc.getMonthViewEndDate(firstDayOfMonth, this.firstDay);

      this.emitChangeDay(this.currentMonth.clone())
      this.emitChangeWeek(this.currentMonth.clone())

      this.$emit('changeMonth', start, end, firstDayOfMonth)
    },
    emitChangeWeek (newWeekStart) {
      console.log('emitChangeWeek first day of week', newWeekStart)
      this.computedWeekStart = newWeekStart
    },
    emitChangeDay (newDay) {
      console.log('new day in emit change day', newDay)
      this.computedStartDate = newDay
    },
    changeTimeFrame (newTimeFrame) {
      this.$emit('changeTimeFrame', newTimeFrame) 
      this.computedTimeFrame = newTimeFrame
    }
  }
}
  
</script>
<style lang="scss">
  .comp-full-calendar{
    // font-family: "elvetica neue", tahoma, "hiragino sans gb";
    padding:20px;
    background: #fff;
    max-width: 100%;
    margin:0 auto;
    ul,p{
      margin:0;
      padding:0;
    }
  }

  .full-calendar-body{
    margin-top: 20px;
  .weeks{
    display: flex;
  .week{
    flex:1;
    text-align: center;
    // border-right:1px solid #e0e0e0;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    text-align: center;
  }
  }
  .dates {
    position:relative;
  .week-row{
  // width: 100%;
  // position:absolute;
    border-left:1px solid #e0e0e0;
    display: flex;
  .day-cell{
    flex:1;
    min-height: 112px;
    padding:4px;
    border-right:1px solid #e0e0e0;
    border-bottom:1px solid #e0e0e0;
  .day-number{
    text-align: right;
  }
  &.today{
     background-color:#fcf8e3;
   }
  &.not-cur-month{
  .day-number{
    color:rgba(0,0,0,.24);
  }
  }
  }
  }
  .dates-events{
    position:absolute;
    top:0;
    left:0;
    z-index:1;
    width: 100%;
  .events-week{
    display: flex;
    min-height: 120px;
  .events-day{
    cursor: pointer;
    flex:1;
    min-height: 112px;
    overflow: hidden;
    text-overflow: ellipsis;
  .day-number{
    text-align: right;
    padding:4px 5px 4px 4px;
    opacity: 0;
  }
  &.not-cur-month{
  .day-number{
    color:rgba(0,0,0,.24);
  }
  }
  .event-box{
  .event-item{
    cursor: pointer;
    font-size:12px;
    background-color:#C7E6FD;
    margin-bottom:2px;
    color: rgba(0,0,0,.87);
    padding:0 0 0 4px;
    height: 18px;
    line-height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  &.is-start{
     margin-left: 4px;
   // border-top-left-radius:4px;
   // border-bottom-left-radius:4px;
   }
  &.is-end{
     margin-right: 4px;
   // border-top-right-radius:4px;
   // border-bottom-right-radius:4px;
   }
  &.is-opacity{
     opacity: 0;
   }
  }
  .more-link{
    cursor: pointer;
  // text-align: right;
    padding-left: 8px;
    padding-right: 2px;
    color: rgba(0,0,0,.38);
    font-size: 14px;
  }
  }
  }
  }
  }
  .more-events{
    position:absolute;
    width: 200px;
    z-index: 2;
    border:1px solid #eee;
    box-shadow: 0 2px 6px rgba(0,0,0,.15);
  .more-header{
    background-color: #F9690E;
    font-weight: bold;
    padding:5px;
    display: flex;
    align-items : center;
    font-size: 14px;
  .title{
    flex:1;
  }
  .close{
    margin-right: 2px;
    cursor: pointer;
    font-size: 16px;
  }
  }
  .more-body{
    height: 146px;
    overflow: hidden;
  .body-list{
    height: 144px;
    padding:5px;
    overflow: auto;
    background-color:#fff;
  .body-item{
    cursor: pointer;
    font-size:12px;
    background-color:#C7E6FD;
    margin-bottom:2px;
    color: rgba(0,0,0,.87);
    padding:0 0 0 4px;
    height: 18px;
    line-height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px solid black;
    border-radius: 3px;
  }
  }
  }
  }
  }
  }
</style>