const { User } = require('../models')

module.exports = {
  async submit (req, res) {
    try {
      let newPassword = req.body.newPassword
      let userId = req.body.userId
      const user = await User.findOne({where: {id: userId}})
      if (user) {
        await user.update({
          password: newPassword,
          resetPasswordToken: null,
          resetPasswordExpires: null
        }).then(() => {
          res.status(201).send()
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'An error occurred while processing the request'
      })
    }
  }
}
