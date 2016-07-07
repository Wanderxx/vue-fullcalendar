<template>
  <div class="comp-full-calendar">
    <!-- header pick month -->
    <fc-header :current-date.sync="currentDate" :current-info="currentInfo">

      <div slot="header-right">
        <slot name="fc-header-right">
        </slot>
      </div>
    </fc-header>
    <!-- body display date day and events -->
    <fc-body :current-date="currentDate" :events="events">
      <div slot="body-card">
        <slot name="fc-body-card">
        </slot>
      </div>
    </fc-body>
  </div>
</template>
<script type="text/babel">
  const MONTH_NAMES = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','11月','12月']

  export default {
    props : {
      events : {
        type : Array,
        default : []
      }
    },
    created () {
    },
    data () {
      return {
        currentDate : new Date()
      }
    },
    computed : {
      currentInfo () {
        return this.currentDate.getFullYear() + '年' + MONTH_NAMES[this.currentDate.getMonth()]
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
    width: 960px;
    ul,p{
      margin:0;
      padding:0;
      font-size: 14px;
    }
  }
</style>