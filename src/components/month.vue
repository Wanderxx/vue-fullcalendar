<template>
    <!-- body display date day and events -->
    <div class="full-calendar-body">
        <div class="weeks resource-header">
            <strong class="week" v-for="dayIndex in 7">{{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong>
        </div>
        <div class="dates" ref="dates">
            <div class="dates-bg">
                <div class="week-row" v-for="week in currentDates">
                    <div class="day-cell" v-for="day in week" :class="{'today' : day.isToday,
                  'not-cur-month' : !day.isCurMonth}">
                        <p class="day-number">{{ day.monthDay }}</p>
                    </div>
                </div>
            </div>

            <!-- absolute so we can make dynamic td -->
            <div class="dates-events">
                <div class="events-week" v-for="week in currentDates">
                    <div class="events-day" v-for="day in week" track-by="$index" :class="{'today' : day.isToday,
                  'not-cur-month' : !day.isCurMonth}" @click.stop="dayClick(day.date, $event)">
                        <p class="day-number">{{day.monthDay}}</p>
                        <div class="event-box">
                            <event-card :event="event" :date="day.date" :firstDay="firstDay"
                                        v-for="event in day.events" v-show="event.cellIndex <= eventLimit"
                                        @click="eventClick">
                            </event-card>
                            <p v-if="day.events.length > eventLimit" class="more-link" @click.stop="selectThisDay(day, $event)">
                                + {{day.events[day.events.length -1].cellIndex - eventLimit}} more
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- full events when click show more -->
            <div class="more-events" v-show="showMore" :style="{left: morePos.left + 'px', top: morePos.top + 'px'}">
                <div class="more-header">
                    <span class="title">{{ moreTitle(selectDay.date) }}</span>
                    <span class="close" @click.stop="showMore = false">x</span>
                </div>
                <div class="more-body">
                    <ul class="body-list">
                        <li v-for="event in selectDay.events" v-show="event.isShow" class="body-item" @click="eventClick(event, $event)">
                            {{event.title}}
                        </li>
                    </ul>
                </div>
            </div>

            <slot name="body-card">

            </slot>

        </div>
    </div>
</template>

<script>
import dateFunc from './dateFunc'
import timeFunc from './timeFunc'
import EventCard from './eventCard.vue'
import moment from 'moment'

export default {
    props : {
      locale : {
        type : String,
        default : 'en'
      },
      firstDay : {
        type : Number | String,
        validator (val) {
          let res = parseInt(val);
          return res >= 0 && res <= 6
        },
        default : 0
      },
      eventLimit: Number,
      // showMore: Boolean,
      // morePos: Object,
      // selectDay: Object,
      options: Object,
      currentMonth : {}
    },
    data () {
        return { 
            eventsArray: [],
            showMore: false,
            selectDay : {},
            morePos : {
                top: 0,
                left : 0
            }
        }
    },
    components : {
      'event-card': EventCard,
    },
    mounted () {
      this.emitChangeMonth(this.currentMonth);
    },
    computed: {
        currentDates() {
            return this.getCalendar()
        },
        //TODO: turn events into computed events after logic is figured out
        events: {
            get: function () {
                return this.eventsArray.length !== 0 ? this.eventsArray : this.getEvents()
            },
            set: function () {
                return this.eventsArray
            }
        }
    },
    methods: {
        getEvents () {
            let eventArray = []

            this.options.resources.groups.map((item) => {
                item.events.map((event) => {
                    let duration = event.duration ? 
                        timeFunc.convertDurationToMinutes(event.duration) : 
                        timeFunc.getDurationBetweenTimes(event.startTime, event.endTime)
                   
                    eventArray.push({
                        title: event.type + ' ' + event.title + ' ' + event.recipient,
                        start: event.date,
                        end: moment(event.date).add(duration, 'm').format('YYYY-MM-DD') // TODO: work in duration
                    })
                })
            })

            return eventArray
        },
        emitChangeMonth (firstDayOfMonth) {

            this.currentMonth = firstDayOfMonth;
            let start = dateFunc.getMonthViewStartDate(firstDayOfMonth, this.firstDay);
            let end = dateFunc.getMonthViewEndDate(firstDayOfMonth, this.firstDay);

            this.$emit('changeMonth', start, end, firstDayOfMonth)
        },
        moreTitle (date) {
            if (!date) return '';
            return moment(date).format('ll');
        },
        getCalendar() {
            // calculate 2d-array of each month

            let monthViewStartDate = dateFunc.getMonthViewStartDate(this.currentMonth, this.firstDay);
            let calendar = [];

            for (let perWeek = 0; perWeek < 6; perWeek++) {
                let week = [];

                for (let perDay = 0; perDay < 7; perDay++) {
                    week.push({
                        monthDay: monthViewStartDate.date(),
                        isToday: monthViewStartDate.isSame(moment(), 'day'),
                        isCurMonth: monthViewStartDate.isSame(this.currentMonth, 'month'),
                        weekDay: perDay,
                        date: moment(monthViewStartDate),
                        events: this.slotEvents(monthViewStartDate)
                    });

                    monthViewStartDate.add(1, 'day');
                }

                calendar.push(week);
            }

            return calendar
        },
        slotEvents (date) {

            // find all events start from this date
            let cellIndexArr = [];
            let thisDayEvents = this.events.filter(day => {
                let st = moment(day.start);
                let ed = moment(day.end ? day.end : st);

                return date.isBetween(st, ed, null, '[]');
            });

            // sort by duration
            thisDayEvents.sort((a,b)=>{
                if(!a.cellIndex) return 1;
                if (!b.cellIndex) return -1;
                return a.cellIndex - b.cellIndex
            });

            // mark cellIndex and place holder
            for (let i = 0;i < thisDayEvents.length;i++) {
                thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || (i + 1);
                thisDayEvents[i].isShow = true;
                if (thisDayEvents[i].cellIndex == i+1 || i>2) continue;
                thisDayEvents.splice(i,0,{
                    title : 'holder',
                    cellIndex : i+1,
                    start : date.format(),
                    end : date.format(),
                    isShow : false
                })
            }

            return thisDayEvents
        },
        selectThisDay (day, jsEvent) {
            this.selectDay = day;
            this.showMore = true;
            this.morePos = this.computePos(event.target);
            this.morePos.top -= 100;
            let events = day.events.filter(item =>{
            return item.isShow == true
            });
            this.$emit('moreClick', day.date, events, jsEvent)
        },
        computePos (target) {
            let eventRect = target.getBoundingClientRect();
            let pageRect = this.$refs.dates.getBoundingClientRect();
            return {
            left : eventRect.left - pageRect.left,
            top  : eventRect.top + eventRect.height - pageRect.top
            }
        },
        dayClick(day, jsEvent) {
            this.$emit('dayClick', day, jsEvent)
        },
        eventClick(event, jsEvent) {
            if (!event.isShow) return;

            jsEvent.stopPropagation();
            let pos = this.computePos(jsEvent.target);
            this.$emit('eventClick', event, jsEvent, pos);
        }
    },
    filters: {
        localeWeekDay(weekday, firstDay, locale) {
            firstDay = parseInt(firstDay);
            const localMoment = moment().locale(locale);
            return localMoment.localeData().weekdaysShort()[(weekday + firstDay) % 7];
        }
    }
}
</script>

<style>

</style>
