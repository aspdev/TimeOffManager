const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
  getRecordedRequests (req, res, next) {
    if (req.headers.authorization !== undefined) {
      jwt.verify(req.headers.authorization, config.authentication.jwtSecret, (error) => {
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
          next()
        }
      })
    } else {
      res.status(401).send({
        error: 'Unauthorized attempt to access the resource'
      })
    }
  }
}
