<template>
  <div class="comp-full-calendar">
    <!-- header pick month -->
    <fc-header :current-date.sync="currentDate" :title-format="titleFormat"
      @change="emitChangeMonth">

      <div slot="header-right">
        <slot name="fc-header-right">
        </slot>
      </div>
    </fc-header>
    <!-- body display date day and events -->
    <fc-body :current-date="currentDate" :events="events" :month-names="monthNames" 
      :week-names="weekNames" :first-day="firstDay"
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
  import langSets from './dataMap/langSets'

  export default {
    props : {
      events : { // events will be displayed on calendar
        type : Array,
        default : []
      },
      lang : {
        type : String,
        default : 'zh'
      },
      firstDay : {
        type : Number,
        coerce (val) {
          let res = parseInt(val)
          if (res < 0 || res > 6) return 0
          return res
        },
        default : 0
      },
      titleFormat : {
        type : String,
        default () {
          return langSets[this.lang].titleFormat
        }
      },
      monthNames : {
        type : Array,
        default () {
          return langSets[this.lang].monthNames
        } 
      },
      weekNames : {
        type : Array,
        default () {
          let arr = langSets[this.lang].weekNames
          return arr.slice(this.firstDay).concat(arr.slice(0, this.firstDay))
        }
      }
    },
    created () {
      this.emit = this.$dispatch.bind(this) || this.$emit.bind(this)
    },
    data () {
      return {
        currentDate : new Date(),
        emit : () => {}
      }
    },
    methods : {
      emitChangeMonth (start, end, current) {
        this.emit('changeMonth', start, end, current)
      },
      emitEventClick (event, jsEvent, pos) {
        this.emit('eventClick', event, jsEvent, pos)
      },
      emitDayClick (day, jsEvent) {
        this.emit('dayClick', day, jsEvent)
      },
      emitMoreClick (day, events, jsEvent) {
        this.emit('moreClick', day, event, jsEvent)
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