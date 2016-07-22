##vue-fullcalendar

[![npm](https://img.shields.io/npm/v/vue-fullcalendar.svg?maxAge=2592000?style=flat-square)]()
[![npm](https://img.shields.io/npm/dt/vue-fullcalendar.svg?maxAge=2592000?style=flat-square)]()
[![npm](https://img.shields.io/npm/dm/vue-fullcalendar.svg?maxAge=2592000?style=flat-square)]()

![demo.gif](http://g.recordit.co/vovteJ5m9o.gif)

So as it's called. This is a fullCalendar component based on vue.js . No Jquery or fullCalendar.js required. 
Currently, It only supports month view. I will use fc stands for vue-fullcalendar in following words.

Feel free to download it,re-develop it and use in your project.

### install

open your project and run this command.

```shell
$ npm install vue-fullcalendar
```
or

just download this project from git

### demo

You can directly visit the simple online [demo](http://wanderxx.github.io/fullcalendar)

switch you directory to this project, and run this command. Then go to your http://localhost:8080

```shell
$ npm install (NOTE : if you are in China mainland, cnpm install is more recommended.)
$ npm run dev
```

If everything runs well. You should see this.

![Yeah you see the calendar](http://upload-images.jianshu.io/upload_images/1678581-169e72e080ce5fad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

In my project, I add eventCard and filter. So, I find this roof. You find your roof.


### import

In your code , do as follow. Then you will be able to use this component.

```javascript
import fullcalendar from 'vue-fullcalendar'
```

### VUE-API

Since fc is a vue-based component. I pre-defined some properties.

#### VUE:props

fc will receive some props from outside world.

1. **events** : Events will be displayed on the calendar

```javascript
events = [
  {
    title     :  'event1',
    start     : '2016-07-01'，
    YOUR_DATA : {}
  },
  {
    title     : 'event2',
    start     : '2016-07-02',
    end       : '2016-07-03',
    YOUR_DATA : {}
  }
]         
```

- `title` is the title of this event, will be displayed on calendar

- `start` is the start day of this event

- `end` is the end day of this event

- `YOUR_DATA` You can define as many data you want as possible

2. **lang** : langague of things like monthNames weekNames and titleFormat

```javascript
export default {
  en : {
    weekNames :  ['Mon','Tue','Wen','Thur','Fri','Sat','Sun'],
    monthNames : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
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

### VUE:events

When you do something, fc will dispatch some events out.

1. **changeMonth** : Every time you click arrow to next/last month, fc will dispatch **changeMonth**

```javascript
this.$dispatch('changeMonth', start, end)
```

- `start` is the first day of current monthView

- `end` is the last day of current monthView

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

###END


      

