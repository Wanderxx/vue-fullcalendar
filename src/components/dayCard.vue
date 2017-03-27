<template>
  <div class="week-row">
    <div class="day-cell" v-for="(day, index) in week"
          :class="cssClasses(day)">
      <p class="day-number">{{ day.monthDay }}</p>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    props: ['week'],
    methods: {
      cssClasses (day) {
        let cssClasses = day.cssClass;

        if (!Array.isArray(cssClasses)) {
            cssClasses = [cssClasses];
        } else {
            cssClasses = Array.from(cssClasses);
        }
        if (day.isToday) {
          cssClasses.push('today');
        }
        if (! day.isCurMonth) {
          cssClasses.push('not-cur-month');
        }
        if (_.findIndex(this.weekEnd, end => end === day.weekDay) > -1) {
          cssClasses.push('week-end');
        }
        return cssClasses.join(' ');
      },
    },
  };

</script>

<style lang="scss">
  .week-row {
    // width: 100%;
    // position:absolute;
    border-left:1px solid #e0e0e0;
    display: flex;
    .day-cell {
      flex:1;
      min-height: 112px;
      padding:4px;
      border-right:1px solid #e0e0e0;
      border-bottom:1px solid #e0e0e0;
      .day-number {
        text-align: right;
      }
      &.today {
        background-color: #fcf8e3;
      }
      &.week-end {
        background-color: #f3f3fe;
      }
      &.not-cur-month{
        .day-number{
          color: rgba(0,0,0,.24);
        }
      }
    }
  }
</style>