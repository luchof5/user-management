import { handleError } from './handleError.js'
import { PATH_FILE_ERROR } from '../models.js'

const createUserObject = (args) => {
  try {
    const [nombre, apellido, email, password] = args.slice(1)

    if (args.length > 5) {
      throw new Error('Argument exceded')
    }

    return {
      nombre,
      apellido,
      email,
      password,
    }
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR)
    return objError
  }
}

const createUpdateUserObject = (args) => {
  try {
    const [id, nombre, apellido, email, password] = args.slice(1)

    if (args.length > 6) {
      throw new Error('Argument exceded')
    }

    const updatedUser = {}
    updatedUser.id = id
    if (nombre) updatedUser.nombre = nombre
    if (apellido) updatedUser.apellido = apellido
    if (email) updatedUser.email = email
    if (password) updatedUser.password = password

    return updatedUser
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR)
    return objError
  }
}

export { createUserObject, createUpdateUserObject }
