const faker = require('faker')
const { hash } = require('bcryptjs')

const Users = require('./src/app/models/Users')
const Chefs = require('./src/app/models/Chefs')
const ProfileFiles = require('./src/app/models/ProfileFiles')
const Recipes = require('./src/app/models/Recipes')
const RecipeFiles = require('./src/app/models/RecipeFiles')
const Files = require('./src/app/models/Files')
const { findAll } = require('./src/app/models/Users')

const totalProfilesCreated = 10
const totalRecipesPhotos = 5

function generateNames() {
    return faker.name.firstName().concat(' ', faker.name.lastName())
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
    
        const UsersPromise = users.map(user => Users.create(user))
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

async function createFileProfilesForUsers() {
    const profiles = []
    try {
        const users = await Users.findAll()

        users.map(async user => {
            const file_id = await createFiles(user.name, 'public/img/profiles/user_default.jpeg')
            
            profiles.push({
                user_id: user.id,
                file_id
            })
        })

        const userProfileFiles = await profiles.map(profile => {
            ProfileFiles.create(profile)
        })
        await Promise.all(userProfileFiles)

    } catch (error) {
        console.error(error)
    }
}






















async function createProfileFiles(params) {
    try {
        let profile = {
            file_id: params.file_id
        }

        if(params.chef_id){
            profile.chef_id = params.chef_id
        }
        else if (params.user_id) {
            profile.user_id = params.user_id
        }

        await ProfileFiles.create(profile)

    } catch (error) {
        console.error(error)
    }
}

async function createFilesForChefs() {

    try {

        const chefs = await Chefs.findAll()
        
        const chefsFilesPromise = chefs.map(async chef => {
            const fileId = await Files.create({
                name: chef.name,
                path: 'public/img/profiles/chef_default.jpeg'
            })

            await createProfileFiles({
                chef_id: chef.id,
                file_id: fileId
            })

        })   

        await Promise.all(chefsFilesPromise)

    } catch (error) {
        console.error(error)
    }
}

async function createFilesForUsers() {

    try {

        const users = await Users.findAll()
        
        const usersFilesPromise = users.map(async user => {
            const fileId = await Files.create({
                name: user.name,
                path: 'public/img/profiles/user_default.jpeg'
            })

            await createProfileFiles({
                user_id: user.id,
                file_id: fileId
            })

        })   

        await Promise.all(usersFilesPromise)

    } catch (error) {
        console.error(error)
    }
}

async function createRecipesForUsers() {
    try {
        const users = await Users.findAll()

        const usersRecipesPromise = users.map(async user => {
            const fileId = await Files.create({
                name: user.name,
                path: 'public/img/profiles/user_default.jpeg'
            })

            await createProfileFiles({
                user_id: user.id,
                file_id: fileId
            })

        })   

        await Promise.all(usersFilesPromise)

        
    } catch (error) {
        console.error(error)
    }
}

async function createRecipes() {
    const recipes = {
        chefs: [],
        users: []
    }

    try {
        
        const users = await Users.findAll()
        const chefs = await Chefs.findAll()

        users.map(user => {
            recipes.users.push({
                user_id: user.id,
                ingredients: createIngredientsAndPreparation(),
                preparation: createIngredientsAndPreparation(),
                information: faker.lorem.paragraph(Math.ceil(Math.random() * 10))
            })
        })

        chefs.map(chef => {
            recipes.chefs.push({
                chef_id: chef.id,
                ingredients: createIngredientsAndPreparation(),
                preparation: createIngredientsAndPreparation(),
                information: faker.lorem.paragraph(Math.ceil(Math.random() * 10))
            })
        })



    } catch (error) {
        console.error(error)
    }
}

async function init() {
    await createChefs()
    await createUsers()
    await createFileProfilesForUsers()
}   

init()