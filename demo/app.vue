<template>
  <div>
    <p>
      Here is the demo of vue-fullcalendar, no jquery fullcalendar.js required!
    </p>
    <full-calendar
      :events="fcEvents"
      :first-day="1"
      :event-limit="1"
      class="test-fc"
      locale="en"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick"
    >
      <template
        slot="fc-event-card"
        scope="p"
      >
        <p><i class="fa">Title:</i> {{ p.event.title }}</p>
      </template>
      <template slot="fc-header-left">
        left slot
      </template>


      <template
        slot="fc-header-center"
        slot-scope="p"
      >
        <span
          class="prev-month"
          @click.stop="p.goPrev"
        >prev</span>

        <span class="title">{{ p.title }}</span>

        <span
          class="next-month"
          @click.stop="p.goNext"
        >next</span>
      </template>

      <template slot="fc-header-right">
        right slot
      </template>

      <template
        slot="daySummary"
        slot-scope="p"
      >
        {{ p.events.length }} Events
      </template>

      <template
        slot="more-content"
        slot-scope="p"
      >
        <div
          :style="{left: p.position.left + 'px', top: p.position.top + 'px'}"
          class="more-events"
        >
          <div
            class="more-body"
          >
            <ul class="body-list">
              <li
                v-for="(event, eventKey) in p.selectDay.events"
                v-show="event.isShow"
                :key="eventKey"
                class="body-item"
                @click="eventClick(event, $event)"
              >
                {{ event.title }}
              </li>
            </ul>
          </div>
        </div>
      </template>
    </full-calendar>
  </div>
</template>
<script>
const demoEvents = [
  {
    title: 'Sunny 725-727',
    start: '2018-04-04',
    end: '2018-04-04',
    cssClass: 'family',
  },
  {
    title: 'Lunfel 726-727',
    start: '2018-02-26',
    end: '2018-02-27',
    cssClass: ['home', 'work'],
  },
  {
    title: 'Lunfel 2/27-2/28',
    start: '2018-02-27',
    end: '2018-02-28',
  },
  {
    title: 'Lunfel 2/27-2/28',
    start: '2018-02-27',
    end: '2018-02-28',
  },
  {
    title: 'Lunfel 2/27-2/28',
    start: '2018-02-27',
    end: '2018-02-28',
  },
  {
    title: 'Lunfel 2/26-3/05',
    start: '2018-02-26',
    end: '2018-03-05',
  },
  {
    title: 'Lunfel 1/27-1/28',
    start: '2018-01-27',
    end: '2018-01-28',
  },
  {
    title: 'Lunfel 1/27-2/2',
    start: '2018-01-27',
    end: '2018-02-02',
  },
  {
    title: 'Lunfel 3/27-3/28',
    start: '2018-03-27',
    end: '2018-03-28',
  },
];

export default {
  components: {
    'full-calendar': require('src/fullCalendar'),
  },
  data() {
    return {
      name: 'Sunny!',
      fcEvents: demoEvents,
    };
  },
  methods: {
    changeMonth(start, end, current) {
      console.log(
        'changeMonth',
        start.format(),
        end.format(),
        current.format()
      );
    },
    eventClick(event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos);
    },
    dayClick(day, jsEvent) {
      console.log('dayClick', day, jsEvent);
    },
    moreClick(day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent);
    },
  },
};
</script>
<style lang='scss'>
.app {
  color: green;
}
</style>
