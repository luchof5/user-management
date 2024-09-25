import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { randomUUID, createHash } from 'node:crypto'
import { handleError } from './utils/handleError.js'
import { validarEmail } from './utils/validateEmail.js'

import dotenv from 'dotenv'

// 1° recuperar variables de entorno
dotenv.config()
const PATH_FILE_USER = process.env.PATH_FILE_USER
const PATH_FILE_ERROR = process.env.PATH_FILE_ERROR

// 2° Declarar los metodos
const getUsers = (urlFile) => {
  try {
    if (!urlFile) {
      throw new Error('Acces deneid')
    }
    const exists = existsSync(urlFile)

    if (!exists) {
      writeFileSync(urlFile, JSON.stringify([]))
      return []
    }

    const users = JSON.parse(readFileSync(urlFile))

    return users
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR)
    return objError
  }
}

const getUserById = (id) => {
  try {
    if (!id) {
      throw new Error('Acces deneid')
    }

    const users = getUsers(PATH_FILE_USER)
    const user = users.find((user) => user.id === id)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR)
    return objError
  }
}

const addUser = (userData) => {
  try {
    // addUser recibe un objeto con toda la data para el nuevo usuario
    const { nombre, apellido, email, password } = userData

    // valida que esten los datos míminos para añadir un nuevo usuario
    if (!nombre || !apellido || !email || !password) {
      throw new Error('Missing data')
    }

    // valida que el nombre sea un string
    // valida que el apellido sea un string
    if (
      typeof nombre !== 'string' ||
      typeof apellido !== 'string' ||
      typeof email !== 'string'
    ) {
      throw new Error('Invalid data type')
    }

    // valida que el email sea un string y que no se repita
    if (!validarEmail(email)) {
      throw new Error('Invalid email')
    }

    const users = getUsers(PATH_FILE_USER)

    const findEmail = users.find((user) => user.email === email)

    if (findEmail) {
      throw new Error('Email already exists')
    }

    // hashea la contraseña antes de registrar al usuario
    const hashedPassword = createHash('sha256').update(password).digest('hex')

    const newUser = {
      id: randomUUID(),
      nombre,
      apellido,
      email,
      password: hashedPassword,
      isLoggedIn: false,
    }

    users.push(newUser)

    writeFileSync(PATH_FILE_USER, JSON.stringify(users))
    return newUser
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR)
    return objError
  }
}

const updateUser = (userData) => {
  try {
    const { id, nombre, apellido, email, password } = userData

    if (!id) {
      throw new Error('Missing data')
    }

    // valida que esten los datos mínimos para actualizar un usuario
    if (!nombre || !apellido || !email || !password) {
      throw new Error('Missing data')
    }

    // valida que el nombre sea un string
    // valida que el apellido sea un string
    // valida que el email sea un string
    if (
      typeof nombre !== 'string' ||
      typeof apellido !== 'string' ||
      typeof email !== 'string'
    ) {
      throw new Error('Invalid data type')
    }

    // valida que el email sea un string y que no se repita
    if (!validarEmail(email)) {
      throw new Error('Invalid email')
    }

    // llamamos a los usuarios
    const users = getUsers(PATH_FILE_USER)

    // validamos que el usuario exista
    const oneUser = users.find((user) => user.id === id)

    if (!oneUser) {
      throw new Error('User not found')
    }

    // validamos que el email no exista
    const foundEmail = oneUser.find((user) => user.email === email)

    if (foundEmail) {
      throw new Error('Email already exists')
    }

    const hashedPassword = createHash('sha256').update(password).digest('hex')

    if (nombre) oneUser.nombre = nombre
    if (apellido) oneUser.apellido = apellido
    if (email) oneUser.email = email
    if (password) oneUser.password = hashedPassword

    writeFileSync(PATH_FILE_USER, JSON.stringify(users))

    return oneUser
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR)
    return objError
  }
}

const deleteUser = (id) => {
  try {
    if (!id) {
      throw new Error('Missing data')
    }

    const users = getUsers(PATH_FILE_USER)
    const userDelete = getUserById(id)

    const usersFiltered = users.filter((user) => user.id !== id)

    writeFileSync(PATH_FILE_USER, JSON.stringify(usersFiltered))

    return userDelete
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR)
    return objError
  }
}

export {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  PATH_FILE_USER,
  PATH_FILE_ERROR,
}
