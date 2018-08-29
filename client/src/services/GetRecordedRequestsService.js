import Api from '@/services/Api'
import Store from '@/store/store'

export default {
  getRecordedRequests (employeeId) {
    return Api().get('records', {params: {employeeId: employeeId}, headers: {'Authorization': Store.state.token}})
  }
}
