<template>
  <div class="root">
    <div v-for="resource in resourceGroups">
      <day-header class="resource-header" :headerTimes="timeArray"></day-header>
      <div class="time-row" v-for="name in resource.resourceNames">
        <div class="bordered time-cell">{{name}}</div>
        <div class="bordered time-cell" style="position: relative;" v-for="time in timeArray">
          <template v-if="time == '10:30am'">
            <div style="width: 100px; z-index: 1; background-color: red; position: absolute; top: 5px; left: 0px">
              content</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
import dayHeader from './dayHeader'

export default {
  props: {
    startDate: {},
    options: {}
  },
  computed: {
    timeArray () {
      let dayStartTime = moment(this.options.dayStartTime, 'h:m a')
      let dayEndTime = moment(this.options.dayEndTime, ['h:m a', 'H:m'])
      let currentTime = dayStartTime
      let times = []

      while(currentTime <= dayEndTime) {
        times.push(currentTime.format('h:mma'))
        currentTime.add(30, 'm')
      }

      return times
    },
    resourceGroups () {
      console.log('resource groups')
      console.log(this.options)

      //Grab the defined resource names
      let resourceNamesByGroups = this.options.resources.groups.map((item) => {
        console.log(item)

        let definedResourceNames = item.resourceNames

        let eventResourceNames = item.events.map((event) => {
          return event.resourceName
        })

        console.log('defined', definedResourceNames)
        console.log('event resource names', eventResourceNames)

        return {
          type: [item.type],
          resourceNames: _.union(definedResourceNames, eventResourceNames).sort()
        }
      })

      // Get the ones which were missed in there, but included in the events

      // _.forEach(this.options.resources.)

      console.log('resourceNamesByGroups', resourceNamesByGroups)
      return resourceNamesByGroups
    }
  },
  components: {
    'day-header': dayHeader
  }
}
</script>

<style>
  .bordered {
      border: 1px solid grey;
  }

  .time-row {
      display: flex;
  }

  .time-cell {
      flex: 1;
      min-height: 10px;
      padding: 4px;
      text-align: center;
  }

  .resource-header {
    margin-top: 4px;
    margin-bottom: 4px;
    background-color: pink;
  }
</style>
