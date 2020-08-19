const express = require('express')
const routes = express.Router()

routes.get('/login', function(req, res) {
    return res.render('login/index')
})
    .get('/password-recover', function(req, res) {
        return res.render('login/password-forgot-form')
    })
    .get('/password-reset', function(req, res) {
        return res.render('login/password-reset-form')
    })

module.exports = routes