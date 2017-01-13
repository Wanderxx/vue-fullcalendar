##vue-fullcalendar

[![npm](https://img.shields.io/npm/v/vue-fullcalendar.svg?maxAge=2592000?style=flat-square)]()
[![npm](https://img.shields.io/npm/dt/vue-fullcalendar.svg?maxAge=2592000?style=flat-square)]()

>Works for Vue2 now. This is a fullCalendar component based on vue.js . No Jquery or fullCalendar.js required. Currently, It only supports month view. It's inspired by fullCalendar.io but not cloned by it. So please read the docs here below to understand all features.

[Simple Live Demo](https://wanderxx.github.io/vue-fullcalendar/)

![demo.gif](http://g.recordit.co/vovteJ5m9o.gif)

### install

By NPM

`@latest` works for Vue2
`0.1.11` works for Vue1.*

```shell
// for Vue2
npm install vue-fullcalendar@latest --save 

// for Vue1
npm install vue-fullcalendar@0.1.11 --save 
```
or download code and include it

```shell
<script src='dist/vue-fulcalendar.min.js'>
```

### Usage

Register component globally

```javascript
// Your entry index.js
import Vue from 'vue'
import App from './App'

import fullCalendar from 'vue-fullcalendar'

Vue.component('full-calendar', fullCalendar)

// Vue2
new Vue({
  el : '#app',
  render: h => h(App),
  template : '<App/>',
  components : {
    App
  }
})

//Vue1

new Vue({
	el : 'body',
	components : {
		App
	}
})
```

or register locally in your `.vue` file


### Example

```html
<full-calendar :events="fcEvents" lang="en"></full-calendar>
```

```javascript
var demoEvents = [
	{
      title : 'Sunny Out of Office',
      start : '2016-08-25',
      end : '2017-07-27'
    }
]
export default {
  data () {
	return {
	  fcEvents : demoEvents
	}
  },
  components : {
	'full-calendar': require('vue-fullcalendar')	
  }
}
```

A sample screenshot is here,
![Yeah you see the calendar](http://upload-images.jianshu.io/upload_images/1678581-169e72e080ce5fad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### Docs

#### props

1. **events** : Events will be displayed on the calendar

	```javascript
	events = [
	  {
	    title     :  'event1',
	    start     : '2016-07-01'，
	    cssClass  : 'family',
	    YOUR_DATA : {}
	  },
	  {
	    title     : 'event2',
	    start     : '2016-07-02',
	    end       : '2016-07-03',
	    cssClass  : ['family', 'career']
	    YOUR_DATA : {}
	  }
	]         
	```

	- `title` is the title of this event, will be displayed on calendar
	
	- `start` is the start day of this event
	
	- `end` is the end day of this event

	- `cssClass` is css class of each event label, such that, you will be able to set different colors, style ..
	
	- `YOUR_DATA` You can define as many data you want as possible

2. **lang** : langague of things like monthNames weekNames and titleFormat

	```javascript
	export default {
	  en : {
	    weekNames :  ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'],
	    monthNames : ['January','February','March','April','May','June','July','August','September','October','November','December'],
	    titleFormat : 'MM/yyyy'
	  },
	  zh : {
	    weekNames : ['周一','周二','周三','周四','周五','周六','周日'],
	    monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','11月','12月'],
	    titleFormat : 'yyyy年MM月'
	  }
	}
	```

	- `option` : `zh` | `en`
	
	- `default` : `zh`

3. **monthNames** 

4. **weekNames**

5. **titleFormat**

6. **firstDay** : first day of the week, `Number`, default: 0 (Sunday)
	Sunday=0, Monday=1, Tuesday=2, etc.
	Any number smaller than 0 or larger than 6 will be set to 0.

#### events

fc will dispatch some events out.

1. **changeMonth** : Every time you click arrow to next/last month, fc will dispatch **changeMonth**

	```javascript
	this.$dispatch('changeMonth', start, end, current)
	```
	
	- `start` is the first day of current monthView
	
	- `end` is the last day of current monthView
	
	- `current` is the first day of current month 

2. **eventClick** : Every time you click a event, fc will dispatch **eventClick**

	```javascript
	this.$dispatch('eventClick', event, jsEvent, pos)
	```
	
	- `event` is an Event object hold the event's information
	
	- `jsEvent` holds the native javascript event
	
	- `pos` is the relative coordinates of fc


3. **dayClick** : fc dispatch it when you click a day slot.

	```javascript
	this.$dispatch('eventClick', day, jsEvent)
	```
	
	- `day` is a Date Object of the day you click
	
	- `jsEvent` holds the native javascript event

4. **moreClick** : fc dispatch it when you click a `more` button

#### slots

You will be able to register your own stuff by using slots

1. **fc-header-left** : top left area

2. **fc-header-right** : top right area. In my case, I added a filter menu there 

3. **fc-body-card** : inside the body area, usually working with `EventClick`, to display a event detail

###END
