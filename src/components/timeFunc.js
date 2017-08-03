import moment from 'moment';

let timeFunc = {
  getDurationBetweenTimes (startTime, endTime) {
    let start = moment(startTime, "h:mma")
    let end = moment(endTime, 'h:mma')
    let duration = moment.duration(end.diff(start))
    return duration.asMinutes()
  },
  convertDurationToMinutes (duration) {
    if(duration.toString().includes(':')) {
        // the duration is in the format H:mm
        return moment.duration(duration).asMinutes()
    } else if(duration.includes('.')) {
        // the duration is in the format H:decimal of hour
        let split = duration.split('.')
        return moment.duration(split[0]+':'+((parseInt(split[1])/ 100 * 60).toString())).asMinutes()
    }
  }
};

module.exports = timeFunc;
