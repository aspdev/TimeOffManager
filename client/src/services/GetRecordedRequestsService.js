import Api from '@/services/Api'

export default {
  getRecordedRequests (employeeId) {
    return Api().get('records', {params: {employeeId: employeeId}})
  }
}
