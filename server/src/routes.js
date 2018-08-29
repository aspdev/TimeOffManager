const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SubmitFormController = require('./controllers/SubmitFormController')
const GetRecordedRequestsController = require('./controllers/GetRecordedRequestsController')
const RemoveRecordController = require('./controllers/RemoveRecordController')
const UpdateRecordController = require('./controllers/UpdateRecordController')
const GetRequestsController = require('./controllers/GetRequestsController')
const SubmitFormControllerPolicy = require('./policies/SubmitFormControllerPolicy')
const UpdateFormControllerPolicy = require('./policies/UpdateFormControllerPolicy')
const GetRecordedRequestsControllerPolicy = require('./policies/GetRecordedRequestsControllerPolicy')
const RemoveRecordControllerPolicy = require('./policies/RemoveRecordControllerPolicy')
const ResetPasswordConstroller = require('./controllers/ResetPasswordController')
const ResetPasswordControllerPolicy = require('./policies/ResetPasswordControllerPolicy')
const AuthenticateResetPasswordTokenController = require('./controllers/AuthenticateResetPasswordTokenController')
const SubmitNewPasswordController = require('./controllers/SubmitNewPasswordController')
const SubmitNewPasswordControllerPolicy = require('./policies/SubmitNewPasswordControllerPolicy')

module.exports = (app) => {
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/login', AuthenticationControllerPolicy.login, AuthenticationController.login)
  app.post('/submit', SubmitFormControllerPolicy.submit, SubmitFormController.submit)
  app.get('/records', GetRecordedRequestsControllerPolicy.getRecordedRequests, GetRecordedRequestsController.getRecordedRequests)
  app.delete('/delete', RemoveRecordControllerPolicy.deleteRecord, RemoveRecordController.delete)
  app.put('/update', UpdateFormControllerPolicy.update, UpdateRecordController.update)
  app.post('/reset', ResetPasswordControllerPolicy.reset, ResetPasswordConstroller.reset)
  app.post('/authenticateToken', AuthenticateResetPasswordTokenController.authenticate)
  app.post('/submitNewPassword', SubmitNewPasswordControllerPolicy.submit, SubmitNewPasswordController.submit)

  // Api dla pingera
  // wymagany format parametru - 'YYYYMMDD'
  app.get('/requests/:dateFrom?', GetRequestsController.getRequests)
}
