import Api from '@/services/Api'
import Store from '@/store/store'

export default {
  submit (formData) {
    return Api().post('submit', formData, {headers: {'Authorization': Store.state.token}})
  }
}
