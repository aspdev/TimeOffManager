const Joi = require('joi')

module.exports = {
  submit (req, res, next) {
    console.log(req.body)
    const schema = {
      employeeId: Joi.number(),
      dateFrom: Joi.date().required(),
      dateTo: Joi.date().required().min(Joi.ref('dateFrom')),
      numberOfDaysRequested: Joi.number().min(1).max(26).required()
        .when('selectedType', {is: 'On Demand', then: Joi.number().min(1).max(4).required()}),
      selectedType: Joi.string().required(),
      onDemand: Joi.number().max(4),
      vacation: Joi.number().max(26),
      total: Joi.number().max(26)
    }

    switch (req.body.selectedType) {
      case 'Vacation':
        req.body.vacation = req.body.vacation + req.body.numberOfDaysRequested
        break
      case 'On Demand':
        req.body.onDemand = req.body.onDemand + req.body.numberOfDaysRequested
        break
    }
    Joi.validate(req.body, schema, (err, value) => {
      if (err) {
        switch (err.details[0].context.key) {
          case 'dateFrom':
            res.status(400).send({
              error: 'Provide the start date of your time off'
            })
            break
          case 'dateTo':
            res.status(400).send({
              error: 'Select the correct end date of your time off'
            })
            break
          case 'numberOfDaysRequested':
            res.status(400).send({
              error: 'Allowed Total Days Off values: 1-4: On Demand, 1-26: Vacation'
            })
            break
          case 'selectedType':
            res.status(400).send({
              error: 'Select type of your time off'
            })
            break
          case 'onDemand':
            res.status(400).send({
              error: 'The annual limit of 4 days has been exceeded'
            })
            break
          case 'vacation':
            res.status(400).send({
              error: 'The annual limit of 26 days has been exceeded'
            })
            break
          case 'total':
            res.status(400).send({
              error: 'The annual limit of 26 days has been exceeded'
            })
            break
        }
      } else {
        next()
      }
    })
  }
}
