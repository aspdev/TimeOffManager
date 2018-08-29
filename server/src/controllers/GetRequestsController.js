const { Form } = require('../models')
const { User } = require('../models')
const Sequelize = require('../models/Index').Sequelize
const config = require('../config/config')
const moment = require('moment')

const Op = Sequelize.Op

module.exports = {
  async getRequests (req, res) {
    try {
      if (req.headers.authorization === undefined || (req.headers.authorization !== config.authentication.jwtSecret)) {
        res.status(403).send({
          message: 'Access denied. Unauthorized request'
        })
        return
      }
      var dateFrom = req.params.dateFrom
      if (dateFrom) {
        if (moment(req.params.dateFrom, 'YYYYMMDD', true).isValid()) {
          const requestsByDate = await Form.findAll({
            attributes: {exclude: ['id', 'employeeId']},
            where: {dateFrom: {[Op.gte]: req.params.dateFrom}},
            include: [{model: User, attributes: [[Sequelize.literal("firstName || ' ' || lastName"), 'employee']]}],
            order: ['dateFrom']
          })
          const mappedRequests = requestsByDate.map(request => {
            return {
              dateFrom: moment(request.dateFrom).format('DD-MM-YYYY'),
              dateTo: moment(request.dateTo).format('DD-MM-YYYY'),
              numOfDaysRequested: request.numberOfDaysRequested,
              timeOffType: request.selectedType,
              requestDate: moment(request.createdAt).format('DD-MM-YYYY'),
              requestUpdated: moment(request.updatedAt).format('DD-MM-YYYY'),
              employee: request.User.dataValues.employee
            }
          })
          res.json(mappedRequests)
        } else {
          res.status(400).send({
            message: 'Invalid date format'
          })
        }
      } else {
        const requests = await Form.findAll({
          attributes: {exclude: ['id', 'employeeId']},
          include: [{model: User, attributes: [[Sequelize.literal("firstName || ' ' || lastName"), 'employee']]}],
          order: ['dateFrom']
        })
        const mappedRequests = requests.map(request => {
          return {
            dateFrom: moment(request.dateFrom).format('DD-MM-YYYY'),
            dateTo: moment(request.dateTo).format('DD-MM-YYYY'),
            numOfDaysRequested: request.numberOfDaysRequested,
            timeOffType: request.selectedType,
            requestDate: moment(request.createdAt).format('DD-MM-YYYY'),
            requestUpdated: moment(request.updatedAt).format('DD-MM-YYYY'),
            employee: request.User.dataValues.employee
          }
        })
        res.json(mappedRequests)
      }
    } catch (error) {
      console.log('ERROR: ', error)
      res.status(500).send({
        message: 'An error occurred while handling the request'
      })
    }
  }
}
