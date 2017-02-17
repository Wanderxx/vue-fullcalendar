<template>
    <p class="event-item" :class="cssClasses"
       @click="eventClick(event,$event)">
        {{ isBegin }}
    </p>
</template>

<script>
    import moment from 'moment'

    export default {
        props: ['event', 'date'],
        computed: {
            cssClasses () {
                var cssClasses = this.event.cssClass;

                if (!Array.isArray(cssClasses)) {
                    cssClasses = [cssClasses];
                } else {
                    cssClasses = Array.from(cssClasses);
                }

                if (this.start.isSame(this.date, 'day')) {
                    console.log("is Start: ", this.start.format(), this.date.format());
                    cssClasses.push('is-start');
                }

                if (this.end.isSame(this.date, 'day')) {
                    cssClasses.push('is-end');
                }

                if (! this.event.isShow) {
                    cssClasses.push('is-opacity');
                }

                return cssClasses.join(' ');
            },

            isBegin () {
                return (this.date.day() == 0 || this.start.isSame(this.date, 'day')) ? this.event.title : '　';
            },
            start () {
                return moment(this.event.start);
            },
            end () {
                return moment(this.event.end);
            }
        }
    }
</script>