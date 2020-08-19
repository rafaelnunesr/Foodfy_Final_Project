const express = require('express')
const routes = express.Router()

routes.get('/about', function(req, res) {
    return res.render('about')
})
    .get('/recipes', function(req, res) {
    return res.render('recipes')
})

module.exports = routes