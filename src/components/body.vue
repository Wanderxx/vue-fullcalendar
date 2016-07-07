<template>
  <div class="full-calendar-body">
    <div class="weeks">
      <strong class="week" v-for="week in weekNames">{{week}}</strong>
    </div>
    <div class="dates" v-el:dates>
      <div calss="dates-bg">
        <div class="week-row" v-for="week in currentDates">
          <div class="day-cell" v-for="day in week"
            :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth}">
            <p class="day-number">{{day.monthDay}}</p>
          </div>
        </div>
      </div>
      
      <!-- absolute so we can make dynamic td -->
      <div class="dates-events">
        <div class="events-week" v-for="week in currentDates">
          <div class="events-day" v-for="day in week" track-by="$index"
            :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth}" @click.stop="dayClick(day.date, $event)">
            <p class="day-number">{{day.monthDay}}</p>
            <div class="event-box">
              <p class="event-item" v-for="event in day.events" v-show="event.cellIndex <= eventLimit"
                 :class="{'is-start':isStart(event.start, day.date),
                    'is-end':isEnd(event.end,day.date),
                    'is-opacity' : !event.isShow}" @click="eventClick(event,$event)">
                {{event | isBegin day.date day.weekDay}}
              </p>
              <p v-show="day.events.length > eventLimit" 
                class="more-link" @click.stop="selectThisDay(day, $event)">
                show more
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- full events when click show more -->
      <div class="more-events" v-show="showMore" 
        :style="{left: morePos.left + 'px', top: morePos.top + 'px'}">
        <div class="more-header">
          <span class="title">{{selectDay.date | moreTitle }}</span>
          <span class="close" @click.stop="showMore = false">x</span>
        </div>
        <div class="more-body">
          <ul class="body-list">
            <li v-for="event in selectDay.events" 
              v-show="event.isShow" class="body-item" 
              @click="eventClick(event,$event)">
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
<script type="text/babel">
  const DAY_NAMES = ['周一','周二','周三','周四','周五','周六','周日']
  const MONTH_NAMES = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','11月','12月']
  import dateFunc from './dateFunc'

  export default {
    props : {
      currentDate : {},
      events  : {}
    },
    created () {
      this.events.forEach((item, index) => {
        item._id = item.id || index
        item.end = item.end || item.start
      })
      // this.events = events
    },
    data () {
      return {
        weekNames : DAY_NAMES,
        weekMask : [1,2,3,4,5,6,7],
        // events : [],
        isLismit : true,
        eventLimit : 3,
        showMore : false,
        morePos : {
          top: 0,
          left : 0
        },
        selectDay : {}
      }
    },
    filters : {
      isBegin (event, date, index) {
        let st = new Date(event.start)
        
        if (index == 0 || st.toDateString() == date.toDateString()) {
          return event.title
        }
        return '　'
      },
      moreTitle (date) {
        let dt = new Date(date)
        return DAY_NAMES[dt.getDay()-1] + ', ' + MONTH_NAMES[dt.getMonth()] + dt.getDate() + '日'
      }
    },
    computed : {
      currentDates () {
        return this.getCalendar()
      }
    },
    methods : {
      getStartDate(date) {
        // if duration=0 return 1st day
        return new Date(date.getFullYear(),date.getMonth(),1)
      },
      getCalendar () {
        // calculate 2d-array of each month
        // first day of this month
        let now = new Date() // today
        let current = new Date(this.currentDate)

        let startDate = dateFunc.getStartDate(current)
        // let duration = this.getDuration(current) - 1
        // let endDate = this.changeDay(startDate,duration)

        let curWeekDay = startDate.getDay()

        // begin date of this table may be some day of last month
        startDate.setDate(startDate.getDate() - curWeekDay + 1)

        let calendar = []
        let weekStartDate = startDate
        let weekEndDate = startDate
        // let isFinal = false

        for(let perWeek = 0 ; perWeek < 6 ; perWeek++) {

          let week = []
        
          for(let perDay = 0 ; perDay < 7 ; perDay++) {
            week.push({
              monthDay : startDate.getDate(),
              isToday : now.toDateString() == startDate.toDateString(),
              isCurMonth : startDate.getMonth() == current.getMonth(),
              weekDay : perDay,
              date : new Date(startDate),
              events : this.slotEvents(startDate)
            })

            weekEndDate = startDate // last date of this week
            startDate.setDate(startDate.getDate() + 1)
            // if (startDate.toDateString() == endDate.toDateString()) {
            //   isFinal = true
            //   break
            // }
          }
          weekStartDate = startDate // first date of next week 

          calendar.push(week)
          // if (isFinal) break

        }
        return calendar
      },
      slotEvents(date) {

        // find all events start from this date
        let cellIndexArr = []
        let thisDayEvents = this.events.filter(day => {
          let dt = new Date(day.start)
          let st = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate())
          let ed = day.end ? new Date(day.end) : st
          return date>=st && date<=ed
        })

        // sort by duration
        thisDayEvents.sort((a,b)=>{
          if(!a.cellIndex) return 1
          if (!b.cellIndex) return -1
          return a.cellIndex - b.cellIndex
        })

        // mark cellIndex and place holder
        for (let i = 0;i<thisDayEvents.length;i++) {
          thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || (i + 1)
          thisDayEvents[i].isShow = true
          if (thisDayEvents[i].cellIndex == i+1) continue
          thisDayEvents.splice(i,0,{
            title : 'holder',
            cellIndex : i+1,
            start : dateFunc.format(date,'yyyy-MM-dd'),
            end : dateFunc.format(date,'yyyy-MM-dd'),
            isShow : false
          })
          i++
        }

        return thisDayEvents
      },
      isStart (eventDate, date) {
        let st = new Date(eventDate)
        return st.toDateString() == date.toDateString()
      },
      isEnd (eventDate,date) {
        let ed = new Date(eventDate)
        return ed.toDateString() == date.toDateString()
      },
      selectThisDay (day,event) {
        this.selectDay = day
        this.showMore = true
        this.morePos = this.computePos(event.target)
        this.morePos.top -= 100
      },
      computePos (target) {
        let eventRect = target.getBoundingClientRect()
        let pageRect = this.$els.dates.getBoundingClientRect()
        return {
          left : eventRect.left - pageRect.left,
          top  : eventRect.top + eventRect.height - pageRect.top
        }
      },
      dayClick(day, jsEvent) {
        this.$dispatch('dayClick', day, jsEvent)
      },
      eventClick(event, jsEvent) {
        console.log('cellIndex', event.cellIndex)
        if (!event.isShow) {
          return
        }
        jsEvent.stopPropagation()
        let pos = this.computePos(jsEvent.target)
        this.$dispatch('eventClick', event, jsEvent, pos)
      }
    }
  }
</script>
<style lang="scss">
.full-calendar-body{
  margin-top: 20px;
  .weeks{
    display: flex;
    border-top:1px solid #e0e0e0;
    border-bottom:1px solid #e0e0e0;
    border-left:1px solid #e0e0e0;
    .week{
      flex:1;
      text-align: center;
      border-right:1px solid #e0e0e0;
    }
  }
  .dates {
    position:relative;
    .week-row{
      // width: 100%;
      // position:absolute;
      border-left:1px solid #e0e0e0;
      display: flex;
      .day-cell{
        flex:1;
        min-height: 100px;
        padding:4px;
        border-right:1px solid #e0e0e0;
        border-bottom:1px solid #e0e0e0;
        .day-number{
          text-align: right;
        }
        &.today{
          background-color:#fcf8e3;
        }
        &.not-cur-month{
          .day-number{
            color:rgba(0,0,0,.24);
          }
        }
      }
    }
    .dates-events{
      position:absolute;
      top:0;
      left:0;
      width: 100%;
      .events-week{
        display: flex;
        .events-day{
          cursor: pointer;
          flex:1;
          min-height: 109px;
          .day-number{
            text-align: right;
            padding:4px 5px 4px 4px;
            opacity: 0;
          }
          &.not-cur-month{
            .day-number{
              color:rgba(0,0,0,.24);
            }
          }
          .event-box{
            .event-item{
              cursor: pointer;
              font-size:12px;
              background-color:#3993E5;
              margin-bottom:2px;
              color: #fff;
              padding:4px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &.is-start{
                margin-left: 5px;
                border-top-left-radius:4px;
                border-bottom-left-radius:4px;
              }
              &.is-end{
                margin-right: 5px;
                border-top-right-radius:4px;
                border-bottom-right-radius:4px;
              }
              &.is-opacity{
                opacity: 0;
              }
            }
            .more-link{
              cursor: pointer;
              // text-align: right;
              padding-left:2px;
              padding-right:2px;
              color:#3993E5;
            }
          }
        }
      }
    }
    .more-events{
      position:absolute;
      width: 160px;
      z-index: 1;
      border:1px solid #eee;
      box-shadow: 0 2px 6px rgba(0,0,0,.15);
      .more-header{
        background-color:#eee;
        padding:5px;
        display: flex;
        align-items : center;
        .title{
          flex:1;
        }
        .close{
          margin-right: 2px;
          cursor: pointer;
          font-size: 16px;
        }
      }
      .more-body{
        height: 140px;
        overflow: hidden;
        .body-list{
          height: 120px;
          padding:10px;
          overflow: auto;
          background-color:#fff;
          .body-item{
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            border-radius:2px;
            background-color:#3993E5;
            color:#fff;
            padding:2px;
            margin: 0 2px 5px 2px;
          }
        }
      }
    }
  }
}
</style>
