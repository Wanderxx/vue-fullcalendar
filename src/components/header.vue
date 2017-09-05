<template>
  <div class="full-calendar-header">
    <div class="header-left">
      <span class="title">{{title}}</span>
      <a href="#" class="prev-month" @click.stop="goPrev">
        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <polygon fill-rule="nonzero" fill="#9E9E9E" transform="translate(11.705000, 12.000000) rotate(-360.000000) translate(-11.705000, -12.000000) " points="15.41 16.59 10.83 12 15.41 7.41 14 6 8 12 14 18"></polygon>
        </svg>
      </a>
      <a href="#" class="next-month" @click.stop="goNext">
        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <polygon fill-rule="nonzero" fill="#9E9E9E" transform="translate(11.705000, 12.000000) rotate(-180.000000) translate(-11.705000, -12.000000) " points="15.41 16.59 10.83 12 15.41 7.41 14 6 8 12 14 18"></polygon>
        </svg>
      </a>
    </div>
    <div class="header-center">
      <slot name="header-center">
      </slot>
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
    computed: {
      title () {
        if (!this.currentMonth) return;
        return this.currentMonth.locale(this.locale).format('MMMM YYYY')
      }
    },
    methods : {
      goPrev () {
        var newMonth = moment(this.currentMonth).subtract(1, 'months').startOf('month');
        this.$emit('change', newMonth);
      },
      goNext () {
        var newMonth = moment(this.currentMonth).add(1, 'months').startOf('month');
        this.$emit('change', newMonth);
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
