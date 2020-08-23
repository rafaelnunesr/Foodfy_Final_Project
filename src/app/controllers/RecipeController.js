const Users = require('../models/Users')
const Chefs = require('../models/Chefs')

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
    show(req, res) {
        try {
            return res.render('recipes/show')
        } catch (error) {
            console.error('recipes/show')
        }
    }
}