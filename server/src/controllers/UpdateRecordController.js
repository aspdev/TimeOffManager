const { Form } = require('../models')

module.exports = {
  async update (req, res) {
    Form.update({
      dateFrom: req.body.dateFrom,
      dateTo: req.body.dateTo,
      numberOfDaysRequested: req.body.numberOfDays,
      selectedType: req.body.timeOffType
    }, { where: { id: req.body.formId } })
      .then((result) => {
        res.json(result)
      })
      .catch(error => {
        console.log(error)
        res.status(500).send({
          message: 'An error occurred while updating the record'
        })
      })
  }
}
