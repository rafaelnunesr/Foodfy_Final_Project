const express = require('express')
const routes = express.Router()

routes.get('/admin/recipes/create', function(req, res) {
    return res.render('recipes/create')
})
    .get('/admin/recipes/:id/edit', function(req, res) {
        return res.render('recipes/edit')
    })
    .get('/recipes/:id', function(req, res) {
        return res.render('recipes/show')
    })

module.exports = routes