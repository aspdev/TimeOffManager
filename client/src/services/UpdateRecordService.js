import Api from '@/services/Api'

export default {
  update (object) {
    return Api().put('update', object)
  }
}
