import moment from 'moment';

let dateFunc = {
  getMonthViewStartDate (date, firstDay, setMonth) {

    firstDay = parseInt(firstDay);
    let start = moment(date);
 
    let startOfMonth = setMonth > 0 ? moment().month(setMonth - 1).startOf('month') : moment(start.startOf('month'));

    start.subtract(startOfMonth.day(), 'days');

    if (startOfMonth.day() < firstDay) {
      start.subtract(7, 'days');
    }

    start.add(firstDay, 'days');

    return start;
  },
  getMonthViewEndDate (date) {
    return this.getMonthViewStartDate().add(6, 'weeks');
  }
};

module.exports = dateFunc;
