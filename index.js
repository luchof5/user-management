import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  PATH_FILE_USER,
  PATH_FILE_ERROR,
} from './models.js'
import {
  createUserObject,
  createUpdateUserObject,
} from './utils/createObjetcUser.js'
import { handleError } from './utils/handleError.js'
import { help } from './utils/help.js'

const args = process.argv.splice(2)
const option = args[0]

switch (option) {
  case 'help':
    console.log(help())
    break
  case 'list':
    console.log(getUsers(PATH_FILE_USER))
    break
  case 'search':
    console.log(getUserById(args[1]))
    break
  case 'add':
    const newUser = createUserObject(args)
    if (!newUser.type) {
      console.log(addUser(newUser))
    } else {
      console.log(newUser)
    }
    break
  case 'update':
    const updateUserObject = createUpdateUserObject(args)
    if (!updateUserObject.type) {
      console.log(updateUser(updateUserObject))
    } else {
      console.log(updateUserObject)
    }
    break
  case 'delete':
    console.log(deleteUser(args[1]))
    break
  default:
    const error = handleError('Comando no encontrado', PATH_FILE_ERROR)
    console.log(error)
    break
}
