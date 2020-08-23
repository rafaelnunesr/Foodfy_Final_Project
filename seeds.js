const faker = require('faker')
const { hash } = require('bcryptjs')

const Users = require('./src/app/models/Users')
const Chefs = require('./src/app/models/Chefs')
const ProfileFiles = require('./src/app/models/ProfileFiles')
const Recipes = require('./src/app/models/Recipes')
const RecipeFiles = require('./src/app/models/RecipeFiles')
const Files = require('./src/app/models/Files')

const totalProfilesCreated = 10

function generateNames() {
    return faker.name.firstName().concat(' ', faker.name.lastName())
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createIngredientsAndPreparation() {
    const quantity = Math.floor(Math.random() * 5) + 1

    let stringsWithCommas = ''

    for(let index = 0; index < quantity; index++) {
        stringsWithCommas += faker.name.title() + ','
    }

    return stringsWithCommas
}

async function createChefs() {
    const chefs = []

    try {
        while (chefs.length < totalProfilesCreated) {
            chefs.push({
                name: generateNames()
            })
        }
    
        const ChefsPromise = chefs.map(chef => Chefs.create(chef))
    
        await Promise.all(ChefsPromise)

    } catch (error) {
        console.error(error)
    }
}

async function createUsers () {
    const users = []

    try {

        while(users.length < totalProfilesCreated) {
            users.push({

                name: generateNames(),
                is_admin: Math.round(Math.random()) ? true : false,
                email: faker.internet.email().toLowerCase(),
                password: await hash('1111', 8)

            })
        }
    
        const UsersPromise = users.map(chef => Users.create(chef))
        await Promise.all(UsersPromise)

    } catch (error) {
        console.log(error)
    }
}

async function createFiles(fileName, filePath) {
    try {

        const fileId = await Files.create({
            name: fileName,
            path: filePath
        })

        return fileId

    } catch (error) {
        console.error(error)
    }
}

async function createProfileFilesForUsers() {

    try {
        const users = await Users.findAll()

        users.map(async user => {
            const file_id = await createFiles(user.name, 'public/img/profiles/user_default.jpeg')
            
            const profile = {
                chef_id: user.id,
                file_id
            }

            await ProfileFiles.create(profile)
        })


    } catch (error) {
        console.error(error)
    }
}

async function createProfileFilesForChefs() {

    try {
        const chefs = await Chefs.findAll()

        chefs.map(async chef => {
            const file_id = await createFiles(chef.name, 'public/img/profiles/chef_default.jpeg')
            
            const profile = {
                chef_id: chef.id,
                file_id
            }

            await ProfileFiles.create(profile)
        })


    } catch (error) {
        console.error(error)
    }
}

async function createRecipesForUsers() {
    try {
        const users = await Users.findAll()

        users.map(async user => {

            // Qtt recipes for this user
            const recipeQuantity = generateRandomNumber(0, 10)

            for(let index = 0; index < recipeQuantity; index++){
                const recipeName = await faker.name.title()

                const recipeId = await Recipes.create({

                    user_id: user.id,
                    name: recipeName,
                    ingredients: createIngredientsAndPreparation(),
                    preparation: createIngredientsAndPreparation(),
                    information: await faker.lorem.paragraph(Math.ceil(Math.random() * 10))

                })

                const photosQuantity = generateRandomNumber(1, 5) + 1

                for(let i = 1; i < photosQuantity; i++){

                    const fileId = await createFiles(recipeName, `public/img/recipes/recipe_default_0${i}`)

                    await RecipeFiles.create({

                        recipe_id: recipeId,
                        file_id: fileId
                    })
                }
                
            }
        })

    } catch (error) {
        console.error(error)
    }
}

async function createRecipesForChefs() {
    try {
        const chefs = await Chefs.findAll()

        chefs.map(async chef => {

            // Qtt recipes for this user
            const recipeQuantity = generateRandomNumber(0, 10)

            for(let index = 0; index < recipeQuantity; index++){
                const recipeName = await faker.name.title()

                const recipeId = await Recipes.create({

                    chef_id: chef.id,
                    name: recipeName,
                    ingredients: createIngredientsAndPreparation(),
                    preparation: createIngredientsAndPreparation(),
                    information: await faker.lorem.paragraph(Math.ceil(Math.random() * 10))

                })

                const photosQuantity = generateRandomNumber(1, 5) + 1

                for(let i = 1; i < photosQuantity; i++){

                    const fileId = await createFiles(recipeName, `public/img/recipes/recipe_default_0${i}`)

                    await RecipeFiles.create({

                        recipe_id: recipeId,
                        file_id: fileId
                    })
                }
                
            }
        })

    } catch (error) {
        console.error(error)
    }
}


async function init() {
    await createChefs()
    await createUsers()

    await createProfileFilesForUsers()
    await createProfileFilesForChefs()

    await createRecipesForUsers()
    await createRecipesForChefs()
}   

init()