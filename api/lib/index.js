const validationError = (next, errors) => {
    next({
        message: 'There seems to be some validation error.',
        status: 422,
        errors,
    })
}

const errorMsg = (next, error) => {
    console.log(error)

    if ('errors' in error) {
        let errors = {}

        for (let k in error.errors) {
            errors = {
                ...errors,
                [k]: error.errors[k].message,
            }
        }

        validationError(next, errors)
    } else if ('code' in error && error.code == 11000) {
        validationError(next, {
            email: 'The email is already registrered.'
        })
    } else {
        next({
            message: 'Unable to process request',
        })
    }
}

module.exports = { validationError, errorMsg }