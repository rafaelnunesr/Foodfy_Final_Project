const faker = require('faker')
const { hash } = require('bcryptjs')

const Users = require('./src/app/models/Users')
const Chefs = require('./src/app/models/Chefs')
const ProfileFiles = require('./src/app/models/ProfileFiles')
const Recipes = require('./src/app/models/Recipes')
const RecipeFiles = require('./src/app/models/RecipeFiles')
const Files = require('./src/app/models/Files')

const totalProfilesCreated = 10
const totalRecipesPhotos = 5

function generateName() {
    return faker.name.firstName().concat(' ', faker.name.lastName())
}

async function createChefs () {
    const chefs = []

    try {
        while (chefs.length < totalProfilesCreated) {
            chefs.push({
                name: generateName()
            })
        }
    
        const ChefsPromise = chefs.map(chef => Chefs.create(chef))
    
        await Promise.all(ChefsPromise)

    } catch (error) {
        console.error(error)
    }
}

async function createChefsProfileFiles() {
    const chefsProfileFiles = []
    const chefsIds = []

    try {
        let chefs = await Chefs.findAll()

        chefs.map(chef => {
            chefsIds.push(chef.id)
        })   

        chefsIds.map(chef_id => {
            chefsProfileFiles.push({
                chef_id
            })
        })

         const chefsProfilePromise = chefsProfileFiles.map(chef_id => ProfileFiles.create(chef_id))
         
         await Promise.all(chefsProfilePromise)
        
    } catch (error) {
        console.error(error)
    }  
}

async function createUsers () {
    const users = []

    try {

        while(users.length < totalProfilesCreated) {
            users.push({
                name: generateName(),
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

async function createUsersProfileFiles() {
    const usersProfileFiles = []
    const usersIds = []

    try {

        let users = await Users.findAll()

        users.map(user => {
            usersIds.push(user.id)
        })

        usersIds.map(user_id => {
            usersProfileFiles.push({
                user_id
            })
        })

         const usersProfilePromise = usersProfileFiles.map(user_id => ProfileFiles.create(user_id))
         
         await Promise.all(usersProfilePromise)
        
    } catch (error) {
        console.error(error)
    }  
}

async function createFilesForProfiles() {
    const profileFiles = []

    try {
        const chefs = await Chefs.findAll()
        const users = await Users.findAll()

        chefs.map(chef => {
            profileFiles.push({
                name: chef.name,
                path: 'public/img/profiles/chef_default.jpeg'
            })
        })

        users.map(user => {
            profileFiles.push({
                name: user.name,
                path: 'public/img/profiles/user_default.jpeg'
            })
        })

        const ProfileFilesPromise = profileFiles.map(profile => Files.create(profile))
        await Promise.all(ProfileFilesPromise)

    } catch (error) {
        console.error(error)
    }
}


async function init() {
    await createChefs()
    await createChefsProfileFiles()
    await createUsers()
    await createUsersProfileFiles()
    //await createFilesForProfiles()
}

init()