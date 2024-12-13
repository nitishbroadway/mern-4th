export const validationError = (formik, response) => {
    if ('errors' in response?.data) {
        for (let k in response?.data?.errors) {
            formik.setFieldError(k, response.data.errors[k])
        }
    }
}

export const inStorage = (key, value) => localStorage.setItem(key, value)

export const fromStorage = key => localStorage.getItem(key)

export const removeStorage = key => localStorage.removeItem(key)