import Api from '@/services/Api'

export default {
  submit (newPasswordData) {
    return Api().post('submitNewPassword', newPasswordData)
  }
}
