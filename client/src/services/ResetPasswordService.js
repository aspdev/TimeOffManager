import Api from '@/services/Api'

export default {
  reset (email) {
    return Api().post('reset', email)
  }
}
