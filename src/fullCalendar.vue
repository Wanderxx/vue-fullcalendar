<template>
  <div class="comp-full-calendar">
    <!-- header pick month -->
    <fc-header :current-month="currentMonth"
      :first-day="firstDay"
      :locale="locale"
      @change="emitChangeMonth">

      <div slot="header-left">
        <slot name="fc-header-left">
        </slot>
      </div>

      <div slot="header-right">
        <slot name="fc-header-right">
        </slot>
      </div>
    </fc-header>
    <!-- body display date day and events -->
    <fc-body :current-month="currentMonth" :events="events" :first-day="firstDay" :locale="locale"
      @eventclick="emitEventClick" @dayclick="emitDayClick"
      @moreclick="emitMoreClick">
      <div slot="body-card">
        <slot name="fc-body-card">
        </slot>
      </div>
    </fc-body>
  </div>
</template>
<script type="text/babel">
  // import langSets from './dataMap/langSets'
  import dateFunc from './components/dateFunc'
  import moment from 'moment';

  export default {
    props : {
      events : { // events will be displayed on calendar
        type : Array,
        default : []
      },
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
      }
    },
    mounted () {
      this.emitChangeMonth(this.currentMonth);
    },
    data () {
      return {
        currentMonth : moment().startOf('month')
      }
    },
    methods : {
      emitChangeMonth (firstDayOfMonth) {
        this.currentMonth = firstDayOfMonth;

        let start = dateFunc.getMonthViewStartDate(firstDayOfMonth, this.firstDay);
        let end = dateFunc.getMonthViewEndDate(firstDayOfMonth, this.firstDay);

        this.$emit('changeMonth', start, end, firstDayOfMonth)
      },
      emitEventClick (event, jsEvent, pos) {
        this.$emit('eventClick', event, jsEvent, pos)
      },
      emitDayClick (date, jsEvent) {
        this.$emit('dayClick', date, jsEvent)
      },
      emitMoreClick (date, events, jsEvent) {
        this.$emit('moreClick', date, events, jsEvent)
      }
    },
    components : {
      'fc-body'   : require('./components/body'),
      'fc-header' : require('./components/header')
    }
  }
  
</script>
<style lang="scss">
  .comp-full-calendar{
    // font-family: "elvetica neue", tahoma, "hiragino sans gb";
    padding:20px;
    background: #fff;
    max-width: 960px;
    margin:0 auto;
    ul,p{
      margin:0;
      padding:0;
      font-size: 14px;
    }
  }
</style>