<template>
  <p
    :class="cssClasses"
    class="event-item"
    @click="dayClick"
  >
    <slot
      v-if="showTitle"
      :event="event"
    >
      Def: {{ event.title }}
    </slot>
  </p>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
    date: {
      type: Object,
      required: true,
    },
    firstDay: {
      type: Number | String,
      required: true,
    },
  },

  computed: {
    cssClasses() {
      let cssClasses = this.event.cssClass;

      if (!Array.isArray(cssClasses)) {
        cssClasses = [cssClasses];
      } else {
        cssClasses = Array.from(cssClasses);
      }

      if (this.start.isSame(this.date, 'day')) {
        cssClasses.push('is-start');
      }

      if (this.end.isSame(this.date, 'day')) {
        cssClasses.push('is-end');
      }

      if (!this.event.isShow) {
        cssClasses.push('is-opacity');
      }

      return cssClasses;
    },

    showTitle() {
      return (
        this.date.day() == this.firstDay || this.start.isSame(this.date, 'day')
      );
    },

    start() {
      return moment(this.event.start);
    },

    end() {
      return moment(this.event.end);
    },
  },

  methods: {
    dayClick(event, $event) {
      this.$emit('click', event, $event);
    },
  },
};
</script>
