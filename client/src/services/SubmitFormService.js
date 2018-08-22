import Api from '@/services/Api'

export default {
  submit (formData) {
    return Api().post('submit', formData)
  }
}
