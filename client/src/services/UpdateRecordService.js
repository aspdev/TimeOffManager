import Api from '@/services/Api'
import Store from '@/store/store'

export default {
  update (object) {
    return Api().put('update', object, {headers: {'Authorization': Store.state.token}})
  }
}
