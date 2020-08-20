module.exports = {
    login (req, res) {
        try {
            return res.render('login/index')
        } catch (error) {
            console.error(error)
        }
    },
    passwordRecover (req, res) {
        try {
            return res.render('login/password-forgot-form')
        } catch (error) {
            console.error(error)
        }
    },
    passwordReset (req, res) {
        try {
            return res.render('login/password-reset-form') 
        } catch (error) {
            console.error(error)
        }
    }
}