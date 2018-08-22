const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SubmitFormController = require('./controllers/SubmitFormController')
const GetRecordedRequestsController = require('./controllers/GetRecordedRequestsController')
const RemoveRecordController = require('./controllers/RemoveRecordController')
const UpdateRecordController = require('./controllers/UpdateRecordController')
const GetRequestsController = require('./controllers/GetRequestsController')
const SubmitFormControllerPolicy = require('./policies/SubmitFormControllerPolicy')
const UpdateFormControllerPolicy = require('./policies/UpdateFormControllerPolicy')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationControllerPolicy.login,
    AuthenticationController.login)
  app.post('/submit', SubmitFormControllerPolicy.submit, SubmitFormController.submit)
  app.get('/records', GetRecordedRequestsController.getRecordedRequests)
  app.delete('/delete', RemoveRecordController.delete)
  app.put('/update', UpdateFormControllerPolicy.update, UpdateRecordController.update)

  // wymagany format parametru - 'YYYYMMDD'
  app.get('/requests/:dateFrom?', GetRequestsController.getRequests)
}
