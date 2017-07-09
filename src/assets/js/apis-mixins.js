/**
 * Created by PetitKero on 13/10/2016.
 */
/**
 * This provides mixins used for common api in the Vue components.
 * Before you begin to used it , plz inject this mixins in the components
 * like mixins: [ApiMixin]
 *
 * @mixin
 */
import axios from 'axios'

const ApiMixin = {
  handleReqError(req) {
    if (req.data.error) {
      // this.$vux.toast.show({
      //   type: 'text',
      //   text: req.data && req.data.error ? req.data.error : '未知错误',
      // })
    }
    return req.data.error
  },
  handleCatchError() {
    // this.$vux.toast.show({
    //   type: 'text',
    //   text: err.response && err.response.statusText ? err.response.statusText : '未知错误',
    // })
    return false
  },
  async usersList() {
    try {
      const req = await axios.get('users')
      this.handleReqError(req)
      return req.data
    } catch (err) {
      this.handleCatchError(err)
      return err
    }
  },
  async user(username) {
    try {
      const req = await axios.get(`users/${username}`)
      this.handleReqError(req)
      return req.data
    } catch (err) {
      this.handleCatchError(err)
      return err
    }
  },
  async getChartData(url) {
    const apiUrl = url || `${window.globalArg.testDataUrl}`
    try {
      const res = await axios.get(apiUrl)
      return res.data
    } catch (err) {
      this.handleCatchError(err)
      return err
    }
  },
}

export default {
  created() {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  },
  methods: ApiMixin,
}
