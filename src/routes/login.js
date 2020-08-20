const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/SessionController')

routes.get('/login', SessionController.login)
      .get('password-recover', SessionController.passwordRecover)
      .get('/password-reset', SessionController.passwordReset)

module.exports = routes
