const Joi = require('joi')
const { Form } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
  async update (req, res, next) {
    if (req.headers.authorization !== undefined) {
      jwt.verify(req.headers.authorization, config.authentication.jwtSecret, async (error) => {
        if (error) {
          if (error.message === 'jwt expired') {
            res.status(401).send({
              error: error.message
            })
          } else {
            res.status(401).send({
              error: 'Unauthorized attempt to access the resource'
            })
          }
        } else {
          const schema = {
            formId: Joi.number(),
            dateFrom: Joi.date().required(),
            dateTo: Joi.date().required().min(Joi.ref('dateFrom')),
            numberOfDays: Joi.number().min(1).max(26).required()
              .when('timeOffType', {is: 'On Demand', then: Joi.number().min(1).max(4).required()}),
            timeOffType: Joi.string().required(),
            requestDate: Joi.required(),
            vacation: Joi.number().max(26),
            onDemand: Joi.number().max(4),
            total: Joi.number().max(26)
          }
          const unupdatedRequestFromDb = await Form.findOne({attributes: ['dateFrom', 'dateTo', 'numberOfDaysRequested', 'selectedType'], where: {id: req.body.formId}})
          switch (req.body.timeOffType) {
            case 'Vacation':
              req.body.vacation = (Number(req.body.vacation) - unupdatedRequestFromDb.dataValues.numberOfDaysRequested) + Number(req.body.numberOfDays)
              req.body.total = Number(req.body.vacation) + Number(req.body.onDemand)
              break
            case 'On Demand':
              req.body.onDemand = (Number(req.body.onDemand) - unupdatedRequestFromDb.dataValues.numberOfDaysRequested) + Number(req.body.numberOfDays)
              req.body.total = Number(req.body.vacation) + Number(req.body.onDemand)
              break
          }
          Joi.validate(req.body, schema, (err, value) => {
            if (err) {
              switch (err.details[0].context.key) {
                case 'dateFrom':
                  res.status(400).send({
                    error: 'Provide the start date of your time off',
                    unupdatedRequest: unupdatedRequestFromDb.dataValues
                  })
                  break
                case 'dateTo':
                  res.status(400).send({
                    error: 'Your requested time off cannot end in the past',
                    unupdatedRequest: unupdatedRequestFromDb.dataValues
                  })
                  break
                case 'numberOfDays':
                  res.status(400).send({
                    error: 'Allowed Total Days Off values: 1-4: On Demand, 1-26: Vacation',
                    unupdatedRequest: unupdatedRequestFromDb.dataValues
                  })
                  break
                case 'selectedType':
                  res.status(400).send({
                    error: 'Select type of your time off',
                    unupdatedRequest: unupdatedRequestFromDb.dataValues
                  })
                  break
                case 'vacation':
                  res.status(400).send({
                    error: 'Vacation - the limit of 26 days has been exceeded',
                    unupdatedRequest: unupdatedRequestFromDb.dataValues
                  })
                  break
                case 'onDemand':
                  res.status(400).send({
                    error: 'On Demand - the limit of 4 days has been exceeded',
                    unupdatedRequest: unupdatedRequestFromDb.dataValues
                  })
                  break
                case 'total':
                  res.status(400).send({
                    error: 'The total limit of 26 days has been exceeded',
                    unupdatedRequest: unupdatedRequestFromDb.dataValues
                  })
                  break
              }
            } else {
              delete req.body.vacation
              delete req.body.onDemand
              delete req.body.total
              next()
            }
          })
        }
      })
    } else {
      res.status(401).send({
        error: 'Unauthorize attempt to access the resource'
      })
    }
  }
}
