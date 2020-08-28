const express = require('express')
const routes = express.Router()

const RecipeController = require('../app/controllers/RecipeController')
const { onlyUsers } = require('../app/middlewares/session')

// ADMIN -- CREATE, EDIT, DELETE RECIPES --
routes.get('/admin/recipes/create', RecipeController.create)
      .post('/admin/recipes', onlyUsers, RecipeController.post)
      .get('/admin/recipes/:id/edit', onlyUsers, RecipeController.edit)
      .put('/admin/recipes', onlyUsers, RecipeController.put)
      .delete('/admin/recipes/:id', onlyUsers, RecipeController.delete)

// ADMIN -- SHOW RECIPES
routes.get('/admin/recipes/:id', onlyUsers, RecipeController.show)
      .get('/admin/recipes', onlyUsers, RecipeController.show)
      

// PUBLIC
routes.get('/', RecipeController.index)
      .get('/recipes/:id', RecipeController.show)
      .get('/recipes', RecipeController.showRecipes)

module.exports = routes