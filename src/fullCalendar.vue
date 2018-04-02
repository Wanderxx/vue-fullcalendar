<template>
  <div class="comp-full-calendar">
    <!-- header pick month -->
    <fc-header
      :current-month="currentMonth"
      :first-day="firstDay"
      :locale="locale"
      @change="emitChangeMonth"
    >

      <div slot="header-left">
        <slot name="fc-header-left"/>
      </div>

      <div
        slot="header-center"
        slot-scope="{title, rightArrow, leftArrow, goPrev, goNext}"
      >
        <slot
          :title="title"
          :goPrev="goPrev"
          :goNext="goNext"
          :currentMonth="currentMonth"
          :rightArrow="rightArrow"
          :leftArrow="leftArrow"
          name="fc-header-center"
        >
          <span
            class="prev-month"
            @click.stop="goPrev"
          >{{ leftArrow }}</span>

          <span class="title">{{ title }}</span>

          <span
            class="next-month"
            @click.stop="goNext"
          >{{ rightArrow }}</span>
        </slot>
      </div>

      <div slot="header-right">
        <slot name="fc-header-right"/>
      </div>
    </fc-header>

    <!-- body display date day and events -->
    <div class="full-calendar-body">
      <div class="weeks">
        <strong
          v-for="dayIndex in 7"
          class="week"
        >{{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong>
      </div>
      <div
        ref="dates"
        class="dates"
      >
        <div class="dates-bg">
          <div
            v-for="week in currentDates"
            class="week-row"
          >
            <div
              v-for="day in week"
              :class="{'today' : day.isToday, 'not-cur-month' : !day.isCurMonth}"
              class="day-cell"
            >
              <p class="day-number">{{ day.monthDay }}</p>
            </div>
          </div>
        </div>

        <!-- absolute so we can make dynamic td -->
        <div class="dates-events">
          <div
            v-for="(week, key) in currentDates"
            class="events-week"
          >
            <div
              v-for="day in week"
              :class="{'today' : day.isToday,
                       'not-cur-month' : !day.isCurMonth,
                       'events-day--active': day.isActive}"
              track-by="$index"
              class="events-day"
              @click.stop="dayClick(day.date, $event)"
            >
              <p class="day-number">{{ day.monthDay }}</p>
              <div class="event-box">
                <event-card
                  v-for="event in day.events"
                  v-show="event.cellIndex <= eventLimit"
                  :event="event"
                  :date="day.date"
                  :first-day="firstDay"
                  @click="eventClick"
                >
                  <template scope="p">
                    <slot
                      :event="p.event"
                      name="fc-event-card"
                    />
                  </template>
                </event-card>
                <p
                  v-if="day.events.length > eventLimit"
                  class="more-link"
                  @click.stop="selectThisDay(day, $event)"
                >
                  + {{ day.events[day.events.length -1].cellIndex - eventLimit }} more
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- full events when click show more -->
        <div
          v-show="showMore"
          :style="{left: morePos.left + 'px', top: morePos.top + 'px'}"
          class="more-events"
        >
          <div class="more-header">
            <span class="title">{{ moreTitle(selectDay.date) }}</span>
            <span
              class="close"
              @click.stop="showMore = false"
            >x</span>
          </div>
          <div class="more-body">
            <ul class="body-list">
              <li
                v-for="event in selectDay.events"
                v-show="event.isShow"
                class="body-item"
                @click="eventClick(event, $event)"
              >
                {{ event.title }}
              </li>
            </ul>
          </div>
        </div>

        <slot name="body-card"/>

      </div>
    </div>
  </div>
</template>
<script type="text/babel">
// import langSets from './dataMap/langSets'
import dateFunc from './components/dateFunc';
import moment from 'moment';
import EventCard from './components/eventCard.vue';

export default {
  components: {
    'event-card': EventCard,
    'fc-header': require('./components/header'),
  },

  filters: {
    localeWeekDay(weekday, firstDay, locale) {
      const localMoment = moment().locale(locale);
      return localMoment.localeData().weekdaysShort()[
        (weekday + parseInt(firstDay, 10)) % 7
      ];
    },
  },

  props: {
    events: {
      // events will be displayed on calendar
      type: Array,
      default: () => [],
    },
    locale: {
      type: String,
      default: 'en',
    },
    firstDay: {
      type: Number,
      validator(val) {
        const res = parseInt(val, 10);
        return res >= 0 && res <= 6;
      },
      default: 0,
    },
  },

  data() {
    return {
      currentMonth: moment().startOf('month'),
      isLismit: true,
      eventLimit: 3,
      showMore: false,
      morePos: {
        top: 0,

        left: 0,
      },
      selectDay: {},
      activeDay: {},
    };
  },

  computed: {
    currentDates() {
      return this.getCalendar();
    },
  },

  mounted() {
    this.emitChangeMonth(this.currentMonth);
  },

  methods: {
    emitChangeMonth(firstDayOfMonth) {
      this.currentMonth = firstDayOfMonth;

      const start = dateFunc.getMonthViewStartDate(
        firstDayOfMonth,
        this.firstDay
      );
      const end = dateFunc.getMonthViewEndDate(firstDayOfMonth, this.firstDay);

      this.$emit('changeMonth', start, end, firstDayOfMonth);
    },
    moreTitle(date) {
      if (!date) return '';
      return moment(date).format('ll');
    },

    getCalendar() {
      // calculate 2d-array of each month
      const monthViewStartDate = dateFunc.getMonthViewStartDate(
        this.currentMonth,
        this.firstDay
      );
      const calendar = [];

      for (let perWeek = 0; perWeek < 6; perWeek += 1) {
        const week = [];

        for (let perDay = 0; perDay < 7; perDay += 1) {
          week.push({
            monthDay: monthViewStartDate.date(),
            isToday: monthViewStartDate.isSame(moment(), 'day'),
            isCurMonth: monthViewStartDate.isSame(this.currentMonth, 'month'),
            isActive: monthViewStartDate.isSame(this.activeDay, 'day'),
            weekDay: perDay,
            date: moment(monthViewStartDate),
            events: this.slotEvents(monthViewStartDate),
          });

          monthViewStartDate.add(1, 'day');
        }
        console.log(week);
        calendar.push(week);
      }

      return calendar;
    },
    slotEvents(date) {
      // find all events start from this date
      const thisDayEvents = this.events.filter(day => {
        const st = moment(day.start);
        const ed = moment(day.end ? day.end : st);

        return date.isBetween(st, ed, null, '[]');
      });

      // sort by duration
      thisDayEvents.sort((a, b) => {
        if (!a.cellIndex) return 1;
        if (!b.cellIndex) return -1;
        return a.cellIndex - b.cellIndex;
      });

      // mark cellIndex and place holder
      for (let i = 0; i < thisDayEvents.length; i += 1) {
        thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || i + 1;
        thisDayEvents[i].isShow = true;
        if (thisDayEvents[i].cellIndex === i + 1 || i > 2) continue;
        thisDayEvents.splice(i, 0, {
          title: 'holder',
          cellIndex: i + 1,
          start: date.format(),
          end: date.format(),
          isShow: false,
        });
      }

      return thisDayEvents;
    },

    selectThisDay(day, jsEvent) {
      this.selectDay = day;
      this.showMore = true;
      this.morePos = this.computePos(event.target);
      this.morePos.top -= 100;
      const events = day.events.filter(item => item.isShow == true);
      this.$emit('moreClick', day.date, events, jsEvent);
    },

    computePos(target) {
      const eventRect = target.getBoundingClientRect();
      const pageRect = this.$refs.dates.getBoundingClientRect();
      return {
        left: eventRect.left - pageRect.left,
        top: eventRect.top + eventRect.height - pageRect.top,
      };
    },

    dayClick(day, jsEvent) {
      this.activeDay = day;
      console.log(this.currentDates);
      this.$emit('dayClick', day, jsEvent);
    },

    eventClick(event, jsEvent) {
      if (!event.isShow) return;

      jsEvent.stopPropagation();
      const pos = this.computePos(jsEvent.target);
      this.$emit('eventClick', event, jsEvent, pos);
    },
  },
};
</script>

<style lang="scss">
.comp-full-calendar {
  // font-family: "elvetica neue", tahoma, "hiragino sans gb";
  padding: 20px;
  background: #fff;
  max-width: 960px;
  margin: 0 auto;
  ul,
  p {
    margin: 0;
    padding: 0;
  }
}

.full-calendar-body {
  margin-top: 20px;
  .weeks {
    display: flex;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;
    .week {
      flex: 1;
      text-align: center;
      border-right: 1px solid #e0e0e0;
    }
  }
  .dates {
    position: relative;
    .week-row {
      // width: 100%;
      // position:absolute;
      border-left: 1px solid #e0e0e0;
      display: flex;
      .day-cell {
        flex: 1;
        min-height: 112px;
        padding: 4px;
        border-right: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        .day-number {
          text-align: right;
        }
        &.today {
          background-color: #fcf8e3;
        }
        &.not-cur-month {
          .day-number {
            color: rgba(0, 0, 0, 0.24);
          }
        }
      }
    }
    .dates-events {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      .events-week {
        display: flex;
        .events-day {
          cursor: pointer;
          flex: 1;
          min-height: 112px;
          overflow: hidden;
          text-overflow: ellipsis;
          .day-number {
            text-align: right;
            padding: 4px 5px 4px 4px;
            opacity: 0;
          }
          &.not-cur-month {
            .day-number {
              color: rgba(0, 0, 0, 0.24);
            }
          }
          .event-box {
            .event-item {
              cursor: pointer;
              font-size: 12px;
              background-color: #c7e6fd;
              margin-bottom: 2px;
              color: rgba(0, 0, 0, 0.87);
              padding: 0 0 0 4px;
              height: 18px;
              line-height: 18px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &.is-start {
                margin-left: 4px;
                // border-top-left-radius:4px;
                // border-bottom-left-radius:4px;
              }
              &.is-end {
                margin-right: 4px;
                // border-top-right-radius:4px;
                // border-bottom-right-radius:4px;
              }
              &.is-opacity {
                opacity: 0;
              }
            }
            .more-link {
              cursor: pointer;
              // text-align: right;
              padding-left: 8px;
              padding-right: 2px;
              color: rgba(0, 0, 0, 0.38);
              font-size: 14px;
            }
          }
        }
      }
    }
    .more-events {
      position: absolute;
      width: 150px;
      z-index: 2;
      border: 1px solid #eee;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      .more-header {
        background-color: #eee;
        padding: 5px;
        display: flex;
        align-items: center;
        font-size: 14px;
        .title {
          flex: 1;
        }
        .close {
          margin-right: 2px;
          cursor: pointer;
          font-size: 16px;
        }
      }
      .more-body {
        height: 146px;
        overflow: hidden;
        .body-list {
          height: 144px;
          padding: 5px;
          overflow: auto;
          background-color: #fff;
          .body-item {
            cursor: pointer;
            font-size: 12px;
            background-color: #c7e6fd;
            margin-bottom: 2px;
            color: rgba(0, 0, 0, 0.87);
            padding: 0 0 0 4px;
            height: 18px;
            line-height: 18px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
