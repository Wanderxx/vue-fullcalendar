##vue-fullcalendar

![demo.gif](http://g.recordit.co/vovteJ5m9o.gif)

 So as it's called. This is a fullCalendar component based on vue.js . No Jquery or fullCalendar.js required. 
Currently, It only supports month view. I will use fc stands for vue-fullcalendar in following words.

Feel free to download it,re-develop it and use in your project.

### install

open your project and run this command.

```
  npm install vue-fullcalendar
```
or

just download this project from git

### demo

You can directly visit the simple online [demo](http://wanderxx.github.io/fullcalendar)

switch you directory to this project, and run this command. Then go to your http://localhost:8080

```
  npm install (NOTE : if you are in China mainland, cnpm install is more recommended.)
  npm run dev
```

If everything runs well. You should see this.

![Yeah you see the calendar](http://upload-images.jianshu.io/upload_images/1678581-169e72e080ce5fad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

In my project, I add eventCard and filter. So, I find this roof. You find your roof.


### import

In your code , do as follow. Then you will be able to use this component.

```
    import fullcalendar from 'vue-fullcalendar'
```

### VUE-API

Since fc is a vue-based component. I pre-defined some properties.

#### VUE:props

fc will receive some props from outside world.

   1. events: Events will be displayed on the calendar
 ```javascript
events = [
{
title :  'event1',
start: '2016-07-01'，
YOUR_DATA : {}
},
{
title : 'event2',
start : '2016-07-02',
end : '2016-07-03',
YOUR_DATA : {}
}
]         
 ```

### VUE:events

When you do something, fc will dispatch some events out.

1. 'changeMonth' : Every time you click arrow to next/last month, fc will dispatch **changeMonth**

```
this.$dispatch('changeMonth', start, end)
```

**start** is the first day of current monthView

**end** is the last day of current monthView

2. 'eventClick' : Every time you click a event, fc will dispatch **eventClick**

```
this.$dispatch('eventClick', event, jsEvent, pos)
```

**event** is an Event object hold the event's information

**jsEvent** holds the native javascript event

**pos** is the relative coordinates of fc


3. 'dayClick' : fc dispatch it when you click a day slot.

```
 this.$dispatch('eventClick', day, jsEvent)
```

**day** is a Date Object of the day you click

**jsEvent** holds the native javascript event

###END


      

