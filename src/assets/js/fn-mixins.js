/**
 * This provides mixins used for common functions in the Vue components.
 * Before you begin to used it , plz inject this mixins in the components
 * like mixins: [FnMixin]
 *
 * @mixin
 */
const _ = require('lodash')

const fnMixin = {
  replaceAll(str, search, replacement) {
    return str.replace(new RegExp(search, 'g'), replacement)
  },
  goBack() {
    history.back()
  },
  LoadStyle(url) {
    try {
      document.createStyleSheet(url)
    } catch (e) {
      const cssLink = document.createElement('link')
      cssLink.rel = 'stylesheet'
      cssLink.type = 'text/css'
      cssLink.href = url
      const head = document.getElementsByTagName('head')[0]
      head.appendChild(cssLink)
    }
  },
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    const position = {}
    if (to && to.hash) {
      position.selector = to.hash
      if (to.matched.some((m) => { return m.meta.scrollToTop })) {
        position.x = 0
        position.y = 0
      }
      return position
    }
    return false
  },
  /**
   * Get the query params from the URL
   * @returns {{}|*} like '123456789'
   * @example
   * let token = urlParamToObj().rtp_token
   */
  /* eslint-disable */
  urlParamToObj() {
    let fn = null
    let item = null
    let j = null
    let len = null
    let p = null
    let sear = null
    let u = null
    if (location.search) {
      u = location.search
    } else {
      u = location.href
      u = u.slice(0, u.indexOf('#'))
    }
    p = {}
    if (u.indexOf('?') !== -1) {
      sear = u.slice(u.indexOf('?') + 1).split('&')
      fn = (item) => {
        let s
        s = item.split('=')
        return p[s[0]] = s[1]
      }
      for (j = 0, len = sear.length; j < len; j++) {
        item = sear[j]
        fn(item)
      }
    }
    return p
  },
  /* eslint-enable */
  isArray(target) {
    if (_.isArray(target)) {
      return (target.length > 0)
    }
    return false
  },
  /**
   * Let the page scroll to the top
   */
  goToTop() {
    let timer = null
    timer = setInterval(() => {
      const toTop = document.body.scrollTop || document.documentElement.scrollTop
      const speed = Math.ceil(toTop / 5)
      document.documentElement.scrollTop = toTop - speed
      document.body.scrollTop = toTop - speed
      if (toTop === 0) {
        clearInterval(timer)
      }
    }, 50)
  },
  goToLink(url) {
    this.$router.push(url)
  },
  /* eslint-disable */
  /**
   * Replace the numerical to the ancient Chinese number
   * @param {number} n - number need to replaced
   * @returns {string} like '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'
   * @example
   * let cny = numToCny(100)
   */
  numToCny(n) {
    const fraction = ['角', '分']
    const digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖',
    ]
    const unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟'],
    ]
    const head = n < 0 ? '欠' : ''
    n = Math.abs(n)
    let s = ''
    for (let i = 0; i < fraction.length; i += 1) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
    }
    s = s || '整'
    n = Math.floor(n)
    for (let i = 0; i < unit[0].length && n > 0; i++) {
      let p = ''
      for (let j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p
        n = Math.floor(n / 10)
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
    }
    return head + s.replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '零元整')
  },
  /* eslint-enable */
}
export default {
  methods: fnMixin,
}
