const Users = require('../models/Users')
const Chefs = require('../models/Chefs')
const Recipes = require('../models/Recipes')
const RecipesFiles = require('../models/RecipeFiles')
const Files = require('../models/Files')


module.exports = {
    async create (req, res) {
        try {

            const users = await Users.findAll()
            const chefs = await Chefs.findAll()

            let profiles = [{name: 'USERS', id: 0}]
            users.map(user => {
                profiles.push({
                    id: user.id,
                    name: user.name,
                    profileType: 'user'
                })
            })

            profiles.push({name: 'CHEFS', id: 0})
            chefs.map(chef => {
                profiles.push({
                    id: chef.id,
                    name: chef.name,
                    profileType: 'chef'
                })
            })

            return res.render('recipes/create', { profiles })

        } catch (error) {
            console.error(error)
        }
    },
    post (req, res) {

    },
    edit (req, res) {
        try {
            return res.render('recipes/edit')
        } catch (error) {
            console.error(error)
        }
    },
    put (req, res) {

    },
    delete (req, res) {

    },
    async index(req, res) {
        try {
            let lastSixRecipes = await Recipes.findLatestWithLimit('id', 6)

            for (recipeIndex in lastSixRecipes){

                let profile_name = ''
                const recipe = lastSixRecipes[recipeIndex]

                if(recipe.chef_id){
                    const chef = await Chefs.findOne({ where: {id: recipe.chef_id} })
                    profile_name = chef.name
                }
                else if(recipe.user_id) {
                    const user = await Users.findOne({ where: {id: recipe.user_id} })
                    profile_name = user.name
                }

                lastSixRecipes[recipeIndex].profile_name = profile_name

                const fileId = await RecipesFiles.findOne({ where: { recipe_id: recipe.id } })

                const path = await Files.findOne({ where: { id: fileId } })
                console.log(path)
            }
            
            return res.render('index', { recipes: lastSixRecipes })

        } catch (error) {
            console.error(error)
        }
    },
    async show(req, res) {
        try {
            

        } catch (error) {
            console.error(error)
        }
    }
}