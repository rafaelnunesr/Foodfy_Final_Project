const express = require('express')
const routes = express.Router()

routes.get('/admin/users/create', function(req, res) {
    return res.render('users/create')
})

module.exports = routes