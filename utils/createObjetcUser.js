import { handleError } from './handleError.js'
import { PATH_FILE_USER } from './models.js'

const createUserObject = (args) => {
  try {
    const { nombre, apellido, email, password } = args

    return {
      nombre,
      apellido,
      email,
      password,
    }
  } catch (error) {
    const objError = handleError(error, PATH_FILE_USER)
    return objError
  }
}

const createUpdateUserObject = (args) => {
  try {
  } catch (error) {}
}

export { createUserObject, createUpdateUserObject }
