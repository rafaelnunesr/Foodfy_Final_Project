const express = require('express')
const routes = express.Router()

routes.get('/admin/chefs/create', function(req, res) {
    return res.render('chefs/create')
})
    .get('/admin/chefs/:id/edit', function(req, res) {
        return res.render('chefs/edit')
    })

module.exports = routes