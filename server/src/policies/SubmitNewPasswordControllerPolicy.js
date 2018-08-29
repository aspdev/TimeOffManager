const Joi = require('joi')

module.exports = {
  submit (req, res, next) {
    console.log('REQUEST: ', req.body)
    const schema = {
      newPassword: Joi.string().required().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      confirmNewPassword: Joi.string().required().valid(Joi.ref('newPassword')),
      userId: Joi.number().min(0).required()
    }
    Joi.validate(req.body, schema, (err, value) => {
      if (err) {
        switch (err.details[0].context.key) {
          case 'newPassword':
            res.status(400).send({
              error: 'The password must be 8-32 characters in length'
            })
            break
          case 'confirmNewPassword':
            res.status(400).send({
              error: 'Password confirmation failed'
            })
            break
          case 'userId':
            console.log(err)
            res.status(500).send({
              error: 'An error occurred while processing the request'
            })
            break
        }
      } else {
        next()
      }
    })
  }
}
