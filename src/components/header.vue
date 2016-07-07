<template>
  <div class="full-calendar-header">
    <div class="header-left">
      <slot name="header-left">
      </slot>
    </div>
    <div class="header-center">
      <span class="prev-month" @click.stop="goPrev">《 </span>
      <span class="title">{{currentInfo}}</span>
      <span class="next-month" @click.stop="goNext"> 》</span>
    </div>
    <div class="header-right">
      <slot name="header-right">
      </slot>
    </div>
  </div>
</template>
<script type="text/babel">
  import dateFunc from './dateFunc'

  export default {
    created () {
      this.dispatchEvent()
    },
    props : {
      currentDate : {},
      currentInfo : {}
    },
    data () {
      return {}
    },
    methods : {
      goPrev () {
        this.currentDate = this.changeMonth(this.currentDate,-1)
        this.dispatchEvent()
      },
      goNext () {
        this.currentDate = this.changeMonth(this.currentDate,1)
        this.dispatchEvent()
      },
      changeMonth (date, num) {
        let dt = new Date(date)
        return new Date(dt.setMonth(dt.getMonth() + num))
      },
      dispatchEvent() {
        let startDate = dateFunc.getStartDate(this.currentDate)
        let curWeekDay = startDate.getDay()
        startDate.setDate(startDate.getDate() - curWeekDay + 1) // 1st day of this monthView
        let endDate = dateFunc.changeDay(startDate,41)  // the month view is 6*7
        this.$dispatch('changeMonth', 
          dateFunc.format(startDate,'yyyy-MM-dd'),
          dateFunc.format(endDate,'yyyy-MM-dd'))
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
