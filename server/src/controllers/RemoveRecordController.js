const { Form } = require('../models')

function deleteRecord (req, res) {
  const formId = req.query.formId
  return Form.destroy({
    where: { id: formId }
  })
    .then((result) => {
      return result
    })
    .catch((error) => {
      console.log(error)
      return 'An error occured while deleting the row'
    })
}

module.exports = {
  delete (req, res) {
    deleteRecord(req, res).then(result => res.send(JSON.stringify(result)))
  }
}
