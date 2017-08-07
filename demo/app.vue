<template>
  <div>
    <!--first-day='1'  -->
    <full-calendar class="test-fc" 
        :events="fcEvents" 
        :options="calendarOptions" 
        :initialTimeFrame="'week'" 
        
        locale="en" 
        @changeMonth="changeMonth" 
        @eventClick="eventClick" 
        @dayClick="dayClick" 
        @moreClick="moreClick">
      <template slot="fc-event-card" scope="p">
        <p>
          <i class="fa">sadfsd</i> {{ p.event.title }} test</p>
      </template>
    </full-calendar>
  </div>
</template>
<script>
let demoEvents = [
  {
    title: 'Sunny 725-727',
    start: '2017-08-25',
    end: '2017-08-27',
    cssClass: 'family'
  },
  {
    title: 'Lunfel 726-727',
    start: '2017-08-26',
    end: '2017-08-27',
    cssClass: ['home', 'work']
  },
  {
    title: 'Lunfel 2/27-2/28',
    start: '2017-08-27',
    end: '2017-08-28'
  },
  {
    title: 'Lunfel 2/27-2/28',
    start: '2017-08-27',
    end: '2017-08-28'
  },
  {
    title: 'Lunfel 2/27-2/28',
    start: '2017-08-27',
    end: '2017-08-28'
  },
  {
    title: 'Lunfel 2/26-3/05',
    start: '2017-08-26',
    end: '2017-09-05'
  },
  {
    title: 'Lunfel 1/27-1/28',
    start: '2017-08-27',
    end: '2017-08-28'
  },
  {
    title: 'Lunfel 1/27-2/2',
    start: '2017-08-27',
    end: '2017-09-02'
  },
  {
    title: 'Lunfel 3/27-3/28',
    start: '2017-03-27',
    end: '2017-03-28'
  },
];

const options = {
  dayStartTime: '8:00am', // Start time on the calendar
  dayEndTime: '5:30pm', // End time on the calendar
  weekLength: 5, // or 7 
  resources: {
    groups: [ //Split resources into different related groups
      {
        type: 'people', // The type of resource
        resourceNames: ['Charity Barnum', 'Rhett Butler', 'Annie Oakley', 'Dorothy Gale'], //All potential resources in this group
        events: [ //The events for this resource group. The resourceName should map to something in resourceNames
          {
            resourceName: 'Charity Barnum',
            date: '2017-08-08',
            startTime: '12:00pm', //Start time should always be there
            endTime: '4:30pm', //End time is optional, should be able to figure this out from the duration if it's included instead
            type: 'Job',
            title: 'Manufacture Workspace',
            recipient: 'Client'
          }, {
            resourceName: 'Rhett Butler',
            date: '2017-08-04',
            startTime: '8:00am',
            duration: '3.75', // TODO: decide whether this should be time format (h:mm) or decimal (3.75 (3:45 === 3.75)) or minutes (probably best)
            type: 'Job',
            title: 'Manufacture Workspace',
            recipient: 'Client1'
          }, {
            resourceName: 'Annie Oakley',
            date: '2017-08-01',
            startTime: '3:00pm',
            duration: '120', // minutes
            type: 'Job',
            title: 'Manufacture Workspace',
            recipient: 'Client1'
          }
        ]
      }, {
        type: 'contractors',
        resourceNames: ['Contractor One', 'Contractor Two'],
        events: []
      }, {
        type: 'machine',
        resourceNames: ['Machine Two', 'Machine Three', 'Machine Four'],
        events: [
          {
            resourceName: 'Machine One',
            date: '2017-08-04',
            startTime: '1:00pm', //Start time should always be there
            endTime: '4:00pm', //End time is optional, should be able to figure this out from the duration if it's included instead
            type: 'Job',
            title: 'Manufacture Workspace',
            recipient: 'pm'
          }, {
            resourceName: 'Machine One',
            date: '2017-08-04',
            startTime: '8:00am', //Start time should always be there
            endTime: '11:00am', //End time is optional, should be able to figure this out from the duration if it's included instead
            type: 'Job am',
            title: 'Manufacture Workspace',
            recipient: 'am'
          }, {
            resourceName: 'Machine Two',
            date: '2017-08-04',
            startTime: '8:00am',
            duration: '3:45', // TODO: decide whether this should be time format (h:mm) or decimal (3.75 (3:45 === 3.75)) or minutes (probably best)
            type: 'Job',
            title: 'Manufacture Workspace',
            recipient: 'Client1'
          }, {
            resourceName: 'Machine Four',
            date: '2017-08-02',
            startTime: '3:00pm',
            duration: '120', // minutes
            type: 'Job',
            title: 'Manufacture Workspace',
            recipient: 'Client1'
          }, {
            resourceName: 'Machine Two',
            date: '2017-08-04',
            startTime: '11:00am',
            duration: '3:45', // TODO: decide whether this should be time format (h:mm) or decimal (3.75 (3:45 === 3.75)) or minutes (probably best)
            type: 'Job',
            title: 'Manufacture Workspace',
            recipient: 'Client2'
          }
        ]
      }
    ]
  }
}

export default {
  data() {
    return {
      name: 'Sunny!',
      fcEvents: demoEvents,
      calendarOptions: options
    }
  },
  methods: {
    'changeMonth'(start, end, current) {
      console.log('changeMonth', start.format(), end.format(), current.format())
    },
    'eventClick'(event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos)
    },
    'dayClick'(day, jsEvent) {
      console.log('dayClick', day, jsEvent)
    },
    'moreClick'(day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    }
  },
  components: {
    'full-calendar': require('src/fullCalendar')
  }
}
</script>
<style lang='scss'>
.app {
  color: green;
}

.bordered {
  border: 1px solid grey;
}

.time-row {
  display: flex;
}

.time-cell {
  flex: 1;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  position: relative;
}

.resource-header {
  margin-top: 4px;
  margin-bottom: 4px;
  background-color: pink;
}
</style>