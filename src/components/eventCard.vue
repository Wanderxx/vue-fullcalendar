<template>
    <p class="event-item" :class="cssClasses"
       @click="$emit('click', event, $event)">
        {{ title }}
    </p>
</template>

<script>
    import moment from 'moment'

    export default {
        props: ['event', 'date', 'firstDay'],
        computed: {
            cssClasses () {
                var cssClasses = this.event.cssClass;

                if (!Array.isArray(cssClasses)) {
                    cssClasses = [cssClasses];
                } else {
                    cssClasses = Array.from(cssClasses);
                }

                if (this.start.isSame(this.date, 'day')) {
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

            title () {
                // On first day of week or on start date we put the title
                return (this.date.day() == this.firstDay || this.start.isSame(this.date, 'day')) ? this.event.title : '　';
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