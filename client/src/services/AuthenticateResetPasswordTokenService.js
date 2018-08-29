import Api from '@/services/Api'

export default {
  authenticate (resetPasswordToken) {
    return Api().post('authenticateToken', resetPasswordToken)
  }
}
