import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

export const regexMonthAndYear = new RegExp(/^[0-9]{2}\/[0-9]{4}/)
export const regexYearAndMonth = new RegExp(/^[0-9]{4}\/[0-9]{2}/)
export const regexDayMonthAndYear = new RegExp(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)
export const regexHoursMinutesSeconds = new RegExp(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)
export const regexYearMonthAndDay = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/)

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(duration)
dayjs.extend(relativeTime)

const dayjsParseDateCustomPlugin = () => {
  dayjs.prototype.customParse = function(date: any): any {

    if(!date) {
      return null
    }
  
    if(date instanceof Date) {
      return date
    }
  
    // Timestamp
    if(typeof(date) === 'number') {
      return dayjs.tz(date)
    }
    // YYYY-MM-DD
    if(regexYearMonthAndDay.test(date)) {
      return dayjs(date)
    }
    
    //MM/YYYY
    if(regexMonthAndYear.test(date)) {
      let string = 'MM/YYYY'
      if(regexHoursMinutesSeconds.test(date)) {
        string += ' HH:mm:ss'
      }
      return dayjs(date, string)
    }
    //YYYY/MM
    if(regexYearAndMonth.test(date)) {
      let string = 'MM/yyyy'
      if(regexHoursMinutesSeconds.test(date)) {
        string += ' HH:mm:ss'
      }
      return dayjs(date, string)
    }
    //DD/MM/YYYY
    if(regexDayMonthAndYear.test(date)) {
      let string = 'MM/DD/YYYY'
      if(regexHoursMinutesSeconds.test(date)) {
        string += ' HH:mm:ss'
      }
      return dayjs(date, string)
    }
    return date
  }
}

dayjs.extend(dayjsParseDateCustomPlugin)

export default dayjs
