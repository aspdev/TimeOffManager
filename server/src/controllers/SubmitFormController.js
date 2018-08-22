const { Form } = require('../models')

module.exports = {
  async submit (req, res) {
    try {
      const form = await Form.create(req.body)
      const formJson = form.toJSON()
      res.send({
        request: formJson
      })
    } catch (error) {
      res.status(500).send({
        message: 'A problem occured while saving data to database'
      })
    }
  }
}
