const express = require('express')
const routes = express.Router()

const ChefController = require('../app/controllers/ChefController')
const { onlyUsers } = require('../app/middlewares/session')

// ADMIN -- CREATE, EDIT, DELETE CHEFS --
routes.get('/admin/chefs/create', onlyUsers, ChefController.create)
      .post('/admin/chefs', onlyUsers, ChefController.post)
      .get('/admin/chefs/:id/edit', onlyUsers, ChefController.edit)
      .put('/admin/chefs', onlyUsers, ChefController.put)
      .delete('/admin/chefs/:id', onlyUsers, ChefController.delete)

// ADMIN -- SHOW CHEFS
routes.get('/admin/chefs/:id', onlyUsers, ChefController.show)
      .get('/admin/chefs', onlyUsers, ChefController.show)
      

// PUBLIC
routes.get('/chefs/:id', ChefController.show)
      .get('/chefs', ChefController.show)

module.exports = routes