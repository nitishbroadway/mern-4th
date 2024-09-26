class RegisterCtrl {
    register = (req, res, next) => {
        try {
            const { name, email, password, confirmPassword, phone, address } = req.body

            if(password == confirmPassword) {

            } else {
                next({
                    message: 'The password is not confirmed',
                    status: 422
                })
            }
        } catch(error) {
            console.log(error)
        }
    }
}

module.exports = new RegisterCtrl