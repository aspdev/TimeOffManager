import Api from '@/services/Api'

export default {
  delete (formId) {
    return Api().delete('delete', {params: {formId: formId}})
  }
}
