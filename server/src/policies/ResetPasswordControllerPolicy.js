const Joi = require('joi')

module.exports = {
  reset (req, res, next) {
    const schema = {
      email: Joi.string().required().email()
    }
    Joi.validate(req.body, schema, (error, value) => {
      if (error) {
        res.status(400).send({
          error: 'You must provide a valid email'
        })
      } else {
        next()
      }
    })
  }
}
