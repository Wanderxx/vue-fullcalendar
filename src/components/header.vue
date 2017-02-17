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
      <slot name="header-right">
      </slot>
    </div>
  </div>
</template>
<script type="text/babel">
  import dateFunc from './dateFunc'
  import moment from 'moment';

  export default {
    props : {
      currentMonth : {},
      titleFormat  : {},
      firstDay     : {},
      monthNames   : {},
      locale       : {}
    },
    data () {
      return {
        leftArrow  : '<',
        rightArrow : '>'
      }
    },
    computed: {
      title () {
        if (!this.currentMonth) return;
        return this.currentMonth.locale(this.locale).format('MMMM YYYY')
      }
    },
    methods : {
      goPrev () {
        newMonth = moment(this.currentMonth).substract(1, 'months').startOf('month');
        this.$emit('change', newMonth);
      },
      goNext () {
        newMonth = moment(this.currentMonth).add(1, 'months').startOf('month');
        this.$emit('change', newMonth);
      },
      changeMonth (date, num) {
        let dt = new Date(date);
        return new Date(dt.setMonth(dt.getMonth() + num))
      },
      dispatchEvent() {
          this.$emit('change', newMonth);
//        this.title = dateFunc.format(this.headDate, this.titleFormat, this.monthNames);
//
//        let startDate = dateFunc.getMonthViewStartDate(this.headDate, );
//        let endDate = dateFunc.getMonthViewEndDate();
//
//        let startDate = dateFunc.getFirstDayOfMonth(this.headDate);
//        let curWeekDay = startDate.getDay();
//
//        // 1st day of this monthView
//        let diff = parseInt(this.firstDay) - curWeekDay;
//        if (diff) diff -= 7;
//        startDate.setDate(startDate.getDate() + diff) ;
//
//        // the month view is 6*7
//        let endDate = dateFunc.changeDay(startDate, 41);
//
//        // 1st day of current month
//        let currentMonth = dateFunc.getFirstDayOfMonth(this.headDate);

        //this.$emit('change', this.headDate.substract(1, 'months'));
      }
    }
  }
</script>
<style lang="scss">
.full-calendar-header{
  display: flex;
  align-items: center;
  .header-left,.header-right{
    flex:1;
  }
  .header-center{
    flex:3;
    text-align:center;
    .title{
      margin: 0 10px;
    }
    .prev-month,.next-month{
      cursor: pointer;
    }
  }
}
</style>
