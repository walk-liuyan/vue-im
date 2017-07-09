/**
 * Created by PetitKero on 11/11/2016.
 */

/**
 * This provides mixins used for common filters in the Vue components.
 * Before you begin to used it , plz inject this mixins in the components
 * like mixins: [FiltersMixin]
 *
 * @mixin
 */
import Moment from 'moment'

const _ = require('lodash')

const FiltersMixin = {
  /**
   * Detect it's a real empty
   * @param {string} value - A arg gonna be detect .
   * @param {string} defaultText - If it's a empty arg , will show the default test .
   * @returns {string}
   * @example
   * {{data.author | isEmpty('管理员')}}
   */
  isEmpty(value, defaultText) {
    let trimValue = _.trim(value)
    if (!trimValue) {
      if(defaultText){
        return defaultText
      }else {
        return '空'
      }
    }else {
      return trimValue
    }
  },
  add(value, addend = 0) {
    if (!_.isNumber(value)) {
      value = _.toNumber(value)
    }
    if (_.isNaN(value)) {
      return '不是正确的数值'
    }
    if (!_.isNumber(addend)) {
      addend = _.toNumber(addend)
    }
    if (_.isNaN(addend)) {
      return '不是正确的数值'
    }
    return _.add(value, addend)
  },
  subtract(value, subtrahend = 0) {
    if (!_.isNumber(value)) {
      value = _.toNumber(value)
    }
    if (_.isNaN(value)) {
      return '不是正确的数值'
    }
    if (!_.isNumber(subtrahend)) {
      subtrahend = _.toNumber(subtrahend)
    }
    if (_.isNaN(subtrahend)) {
      return '不是正确的数值'
    }
    return _.subtract(value, subtrahend)
  },
  multiply(value, multiplicand = 1) {
    if (!_.isNumber(value)) {
      value = _.toNumber(value)
    }
    if (_.isNaN(value)) {
      return '不是正确的数值'
    }
    if (!_.isNumber(multiplicand)) {
      multiplicand = _.toNumber(multiplicand)
    }
    if (_.isNaN(multiplicand)) {
      return '不是正确的数值'
    }
    return _.multiply(value, multiplicand)
  },
  divide(value, divisor = 1) {
    if (!_.isNumber(value)) {
      value = _.toNumber(value)
    }
    if (_.isNaN(value)) {
      return '不是正确的数值'
    }
    if (!_.isNumber(divisor)) {
      divisor = _.toNumber(divisor)
    }
    if (_.isNaN(divisor)) {
      return '不是正确的数值'
    }
    return _.divide(value, divisor)
  },
  floor(value, precision = 0) {
    if (!_.isNumber(value)) {
      value = _.toNumber(value)
    }
    if (_.isNaN(value)) {
      return '不是正确的数值'
    }
    if (!_.isNumber(precision)) {
      precision = _.toNumber(precision)
    }
    if (_.isNaN(precision)) {
      return '不是正确的数值'
    }
    return _.floor(value, precision)
  },
  round(value, precision = 0) {
    if (!_.isNumber(value)) {
      value = _.toNumber(value)
    }
    if (_.isNaN(value)) {
      return '不是正确的数值'
    }
    if (!_.isNumber(precision)) {
      precision = _.toNumber(precision)
    }
    if (_.isNaN(precision)) {
      return '不是正确的数值'
    }
    return _.round(value, precision)
  },
  ceil(value, precision = 0) {
    if (!_.isNumber(value)) {
      value = _.toNumber(value)
    }
    if (_.isNaN(value)) {
      return '不是正确的数值'
    }
    if (!_.isNumber(precision)) {
      precision = _.toNumber(precision)
    }
    if (_.isNaN(precision)) {
      return '不是正确的数值'
    }
    return _.ceil(value, precision)
  },
  /**
   * Timing formatter
   * @param {date} value - A timing need to formatted , whatever the org format looks like .
   * @param {string} format - (more info: http://momentjs.cn/ ) .
   * @see {@link http://momentjs.cn/}
   * @returns {Date|string}
   * @example
   * {{data.created_at | formatDate('l')}}
   */
  dateFormat(value, format) {
    if (!_.isDate(new Date(value))) {
      return '日期错误'
    }
    return Moment(value).format(format)
  },
  dateCalendar(value) {
    if (!_.isDate(new Date(value))) {
      return '日期错误'
    }
    return Moment(value).calendar()
  },
  dateToNow(value) {
    if (!_.isDate(new Date(value))) {
      return '日期错误'
    }
    return Moment(value).toNow()
  },
  /**
   * Truncate
   * @param {string} value - A long sentence need truncate .
   * @param {object} options - The options object .
   * @returns {string}
   * @example
   * {{data.body | truncate({'length': 24, 'separator': /,? +/, 'omission': ' [...]'})}}
   */
  truncate(value, options) {
    const finalOpt = {
      length: 24,
      separator: /,? +/,
      omission: ' [...]',
    }
    _.assign(finalOpt, options)
    if (!_.isString(value)) {
      value = _.toString(value)
    }
    if (!_.isObject(finalOpt)) {
      return '错误的参数'
    }
    return _.truncate(value, finalOpt)
  },
  trim(value, chars = null) {
    if (!_.isString(value)) {
      value = _.toString(value)
    }
    if (!_.isString(chars)) {
      value = _.toString(chars)
    }
    return _.trim(value, chars)
  },
  replace(value, pattern = null, replacement = null) {
    if (!_.isString(value)) {
      value = _.toString(value)
    }
    if (!_.isRegExp(pattern) && !_.isString(pattern)) {
      return '错误的参数'
    }
    if (!_.isFunction(replacement) && !_.isString(replacement)) {
      return '错误的参数'
    }
    return _.replace(value, pattern, replacement)
  },
  repeat(value, n = 1) {
    if (!_.isNumber(n) || _.isNaN(n)) {
      return '错误的参数'
    }
    if (!_.isString(value)) {
      value = _.toString(value)
    }
    return _.repeat(value, n)
  },
}
export default {
  filters: FiltersMixin,
}
