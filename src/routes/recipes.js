const express = require('express')
const routes = express.Router()

routes.get('/admin/recipes/create', function(req, res) {
    return res.render('recipes/create')
})
    .get('/admin/recipes/:id/edit', function(req, res) {
        return res.render('recipes/edit')
    })

module.exports = routes