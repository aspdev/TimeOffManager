const { Form } = require('../models')
const moment = require('moment')

module.exports = {
  async getRecordedRequests (req, res) {
    try {
      const recordedRequests = await Form.findAll({
        where: {employeeId: req.query.employeeId}
      })
      const serializedRecordedRequest = JSON.stringify(recordedRequests.map(item => {
        return {
          formId: item.id,
          dateFrom: moment(item.dateFrom).format('YYYY-MM-DD'),
          dateTo: moment(item.dateTo).format('YYYY-MM-DD'),
          numberOfDays: item.numberOfDaysRequested,
          timeOffType: item.selectedType,
          requestDate: moment(item.createdAt).format('YYYY-MM-DD')
        }
      }))
      res.send(serializedRecordedRequest)
    } catch (error) {
      console.log('ERROR: ', error)
      res.status(500).send({
        error: 'An error occured while serving the request'
      })
    }
  }
}
