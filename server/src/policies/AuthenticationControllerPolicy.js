const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      firstName: Joi.string().required().regex(new RegExp('^[a-zA-ZzżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$')),
      lastName: Joi.string().required().regex(new RegExp('^[a-zA-ZzżźćńółęąśŻŹĆĄŚĘŁÓŃ]+(-[a-zA-ZzżźćńółęąśŻŹĆĄŚĘŁÓŃ]+)?$')),
      email: Joi.string().required().email(),
      password: Joi.string().required().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      confirmPassword: Joi.string().required().valid(Joi.ref('password'))
    }

    Joi.validate(req.body, schema, (err, value) => {
      if (err) {
        switch (err.details[0].context.key) {
          case 'firstName':
            res.status(400).send({
              error: 'You must provide a valid first name'
            })
            break
          case 'lastName':
            res.status(400).send({
              error: 'You must provide a valid last name'
            })
            break
          case 'email':
            res.status(400).send({
              error: 'You must provide a valid email addresss'
            })
            break
          case 'password':
            res.status(400).send({
              error: 'The password must be 8-32 charachters in length'
            })
            break
          case 'confirmPassword':
            res.status(400).send({
              error: 'Password confirmation failed. '
            })
            break
          default:
            res.status(400).send({
              message: 'Invalid registration information'
            })
        }
      } else {
        next()
      }
    })
  },
  login (req, res, next) {
    const schema = {
      email: Joi.string().required().email(),
      password: Joi.string().required()
    }

    Joi.validate(req.body, schema, (err, value) => {
      if (err) {
        switch (err.details[0].context.key) {
          case 'email':
            res.status(400).send({
              error: 'Provide a valid email'
            })
            break
          case 'password':
            res.status(400).send({
              error: 'Password is required'
            })
            break
          default:
            res.status(400).send({
              error: 'Invalid login information'
            })
        }
      } else {
        next()
      }
    })
  }
}
