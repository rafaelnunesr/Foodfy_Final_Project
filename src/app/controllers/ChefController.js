const Chefs = require('../models/Chefs')

module.exports = {
    async create (req, res) {
        try {

            const chefs = await Chefs.findAll()

            return res.render('chefs/create')
        } catch (error) {
            console.error(error)
        }
    },
    post (req, res) {

    },
    edit (req, res) {
        try {
            return res.render('chefs/edit')
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
            
        } catch (error) {
            console.error('chefs/show')
        }
    }
}