const { User } = require('../models')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const config = require('../config/config')

let computeRandomToken = () => {
  return crypto.randomBytes(24).toString('hex')
}
let computeExpireDate = () => {
  let currentDate = new Date()
  let expireDate = currentDate.setHours(currentDate.getHours() + 1)
  return expireDate
}

module.exports = {
  async reset (req, res) {
    try {
      const email = req.body.email
      const user = await User.findOne({
        where: {email: email}
      })
      if (!user) {
        res.status(403).send({
          error: 'We sent you an email to reset the password if it exists in the database'
        })
      }
      // Jesli email istnieje
      // a) wygeneruj token i date wygasniecia
      let token = computeRandomToken()
      let expireDate = computeExpireDate()
      // b) zapisz do bazy razem z data wygasniecia
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: expireDate
      }).then((result) => {
      // c) wygeneruj url i wyślij powiadomienie
        let url = 'http://localhost:8080/setnewpassword/' + result.dataValues.resetPasswordToken + '/'
        let transporter = nodemailer.createTransport({
          host: config.emailService.host,
          port: config.emailService.port,
          secure: true,
          auth: {
            user: '',
            pass: ''
          }
        })
        const mailOptions = {
          from: config.emailService.emailFrom,
          to: user.dataValues.email,
          subject: 'Reset your password',
          html: '<b>Hi ' + user.dataValues.firstName + '</b></br><p>You recently requested to reset your password for your Simplito TimeOff Manager account.</br>Click the link below to reset it:</p><a href="' + url + '">Reset your password</a><p>If you did not request a password reset, please ignore this email.</br>The password reset is only valid for the next 60 minutes.</p><p>Best regards,</br>Simplito Team</p>'
        }
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('EMAIL ERROR: ', error)
            res.status(500).send({
              error: 'An error occured while servicing you request'
            })
          } else {
            res.status(200).send({
              message: 'We sent you an email to reset the password if it exists in the database'
            })
          }
        })
      })
    } catch (error) {
      console.log('SEND EMAIL ERROR: ', error)
      res.status(500).send({
        error: 'An error occured while servicing your request'
      })
    }
  }
}
