const Users = require('../models/Users')
const Chefs = require('../models/Chefs')
const Recipes = require('../models/Recipes')
const RecipesFiles = require('../models/RecipeFiles')
const Files = require('../models/Files')

async function getRecipeOwner(recipe) {
    try {
        if(recipe.chef_id){
            const chef = await Chefs.findOne({ where: { id: recipe.chef_id } })
            return { name: chef.name, table: 'chefs'}
        }
        else if (recipe.user_id) {
            const user = await Users.findOne({ where: { id: recipe.user_id } })
    
            return { name: user.name, table: 'users'}
        }
    } catch (error) {
        console.error(error)
    }
}

async function getOneFilePathFromRecipe(recipe) {
    try {
        const { file_id } = await RecipesFiles.findOne({ where: {file_id: recipe.id} })
        
        const { path } = await Files.findOne({ where: { id: file_id } })

        return path

    } catch (error) {
        console.error(error)
    }
}

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

                const { file_id } = await RecipesFiles.findOne({ where: { recipe_id: recipe.id } })

                const { path } = await Files.findOne({ where: { id: file_id } })
                console.log(path)

                lastSixRecipes[recipeIndex].path = `${req.protocol}://${req.headers.host}${path.replace("public", "")}`
            }
            
            return res.render('index', { recipes: lastSixRecipes })

        } catch (error) {
            console.error(error)
        }
    },
    show (req, res) {
        return res.send('ok')
    },
    async showARecipe(req, res) {
        try {
            

        } catch (error) {
            console.error(error)
        }
    },
    async showRecipes(req, res) {
        try {
            let { page, limit, filter } = req.query

            page = page || 1
            limit = limit || 12
            offset = limit * (page - 1)

            const params = {
                filter,
                limit,
                offset
            }

            let results = await Recipes.paginate(params)
            results = results.rows

            let recipes = []

            const recipesPromise = await results.map(async recipe => {
                const { name, table } = await getRecipeOwner(recipe)
                const path = await getOneFilePathFromRecipe(recipe)

                recipes.push({
                    id: recipe.id,
                    name: recipe.name,
                    profile_name: name,
                    userKind: table,
                    path: `${req.protocol}://${req.headers.host}${path.replace("public", "")}`,
                    total: recipe.total
                })

            })
            await Promise.all(recipesPromise)

            const pagination = {
                total: Math.ceil(results[0].total / limit),
                page}

            return res.render('recipes/recipes', { recipes, pagination, filter })

        } catch (error) {
            console.error(error)
        }
    }
}