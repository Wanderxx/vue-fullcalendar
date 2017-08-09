<template>
  <div class="full-calendar-header">
    <div class="header-left">
      <slot name="header-left">
      </slot>
    </div>
    <div class="header-center">
      <span class="prev-month" @click.stop="goPrev">{{leftArrow}}</span>
      <span class="title">{{title}}</span>
      <span class="next-month" @click.stop="goNext">{{rightArrow}}</span>
    </div>
    <div class="header-right">
      <!-- TODO: figure out if we want to allow the time frame selector to be overridden, or added to with the slot  -->
      <!-- <slot name="header-right">
          </slot> -->
  
      <button type="button" @click.stop="showDay">Day</button>
      <button type="button" @click.stop="showWeek">Week</button>
      <button type="button" @click.stop="showMonth">Month</button>
    </div>
  </div>
</template>
<script type="text/babel">
import dateFunc from './dateFunc'
import moment from 'moment'


export default {
  props: {
    currentMonth: {},
    titleFormat: {},
    // firstDay: {},
    monthNames: {},
    locale: {},
    startDate: {
      type: Object,
      default: () => { return moment() }
    },
    initialTimeFrame: {
      type: String,
      default: 'month'
    },
    weekLength: {
      type: Number,
      default: 5 // default to mon - fri
    },
    weekStartDate: {
      type: Object,
      default: () => { return moment().startOf('isoweek') }
    }
  },
  data() {
    return {
      // TODO: change these boring arrows
      leftArrow: '◀',
      rightArrow: '►',
      currentTimeFrame: ''
    }
  },
  computed: {
    title() {
      if (!this.computedTimeFrame) return 'Choose time frame'

      if (this.computedTimeFrame === 'day') {

        if (!this.startDate) return
        return this.startDate.locale(this.locale).format('dddd DD MMMM YYYY')

      } else if (this.computedTimeFrame === 'week') {

        // TODO: probably change this so startDate isn't used so we avoid getting days and weeks mixed up.

        let weekLength = this.weekLength
        let weekStartDate = this.weekStartDate.clone().startOf('isoweek').format('dddd DD MMMM YYYY')
        let weekEndDate = this.weekStartDate.clone().startOf('isoweek').add(weekLength - 1, 'd').format('dddd DD MMMM YYYY')
        return weekStartDate + ' - ' + weekEndDate

      } else if (this.computedTimeFrame === 'month') {

        if (!this.currentMonth) return;
        return this.currentMonth.locale(this.locale).format('MMMM YYYY')

      } else {
        return 'Choose time frame'
      }
    },
    computedTimeFrame: {
      get: function () {
        return this.currentTimeFrame != '' ? this.currentTimeFrame : this.initialTimeFrame
      },
      set: function (newValue) {
        this.currentTimeFrame = newValue
      }
    }
  },
  methods: {
    // TODO: update the methods so they handle changing between different time frames
    goPrev() {
      if (this.computedTimeFrame === 'day') {

        var newStartDate = moment(this.startDate).subtract(1, 'days')
        this.$emit('changeDay', newStartDate)

      } else if (this.computedTimeFrame === 'week') {

        var newStartDate = moment(this.weekStartDate).subtract(1, 'w').startOf('isoweek')
        this.$emit('changeWeek', newStartDate)

      } else if (this.computedTimeFrame === 'month') {

        var newMonth = moment(this.currentMonth).subtract(1, 'months').startOf('month');
        this.$emit('changeMonth', newMonth); //TODO: change this so that there are events for each time frame? or add the time frame to the event

      }
    },
    goNext() {
      if (this.computedTimeFrame === 'day') {

        var newStartDate = moment(this.startDate).add(1, 'days')
        this.$emit('changeDay', newStartDate)

      } else if (this.computedTimeFrame === 'week') {

        var newStartDate = moment(this.weekStartDate).add(1, 'w').startOf('isoweek')
        this.$emit('changeWeek', newStartDate)

      } else if (this.computedTimeFrame === 'month') {

        var newMonth = moment(this.currentMonth).add(1, 'months').startOf('month')
        this.$emit('changeMonth', newMonth); //TODO: change this so that there are events for each time frame? or add the time frame to the event

      }
    },
    showDay() {
      console.log('showDay')
      this.$emit('changeTimeFrame', 'day')
      this.computedTimeFrame = 'day'
    },
    showWeek() {
      console.log('showWeek')
      this.$emit('changeTimeFrame', 'week')
      this.computedTimeFrame = 'week'
    },
    showMonth() {
      console.log('showMonth')
      this.$emit('changeTimeFrame', 'month')
      this.computedTimeFrame = 'month'
    }
  }
}
</script>
<style lang="scss">
.full-calendar-header {
  display: flex;
  align-items: center;
  .header-left,
  .header-right {
    flex: 1;
  }
  .header-center {
    flex: 3;
    text-align: center;
    .title {
      margin: 0 10px;
    }
    .prev-month,
    .next-month {
      cursor: pointer;
    }
  }
}
</style>
