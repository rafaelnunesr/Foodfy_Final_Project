const Users = require('../models/Users')
const Chefs = require('../models/Chefs')

module.exports = {
    async create (req, res) {
        try {

            const users = await Users.findAll()
            const chefs = await Chefs.findAll()

            console.log(users)

            return res.render('recipes/create')
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