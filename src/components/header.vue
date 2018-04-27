<template>
  <div class="full-calendar-header">
    <div class="header-left">
      <slot name="header-left" />
    </div>

    <div class="header-center">
      <slot
        :title="title"
        :goPrev="goPrev"
        :goNext="goNext"
        :currentMonth="currentMonth"
        :rightArrow="rightArrow"
        :leftArrow="leftArrow"
        name="header-center"
      />
    </div>

    <div class="header-right">
      <slot name="header-right"/>
    </div>
  </div>
</template>
<script type="text/babel">
import dateFunc from './dateFunc';
import moment from 'moment';

export default {
  props: {
    currentMonth: {
      type: Object,
      default: undefined,
    },
    titleFormat: {
      type: String,
      default: undefined,
    },
    firstDay: {
      type: Number | String,
      default: undefined,
    },
    monthNames: {
      type: Array,
      default: undefined,
    },
    locale: {
      type: String,
      default: undefined,
    },
  },

  data() {
    return {
      leftArrow: '<',
      rightArrow: '>',
    };
  },

  computed: {
    title() {
      if (!this.currentMonth) return '';
      return this.currentMonth.locale(this.locale).format('MMMM YYYY');
    },
  },

  methods: {
    goPrev() {
      const newMonth = moment(this.currentMonth)
        .subtract(1, 'months')
        .startOf('month');
      this.$emit('change', newMonth);
    },
    goNext() {
      const newMonth = moment(this.currentMonth)
        .add(1, 'months')
        .startOf('month');
      this.$emit('change', newMonth);
    },
  },
};
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
    flex: 2;
    text-align: center;

    .title {
      margin: 0 10px;
    }

    .prev-month,
    .next-month {
      cursor: pointer;
    }
  }

  .header-right {
    text-align: right;
  }
}
</style>
