import Api from '@/services/Api'
import Store from '@/store/store'

export default {
  delete (formId) {
    return Api().delete('delete', {params: {formId: formId}, headers: {'Authorization': Store.state.token}})
  }
}
