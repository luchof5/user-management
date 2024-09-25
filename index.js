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
    console.log(addUser(newUser))
    break
  case 'update':
    const updateUserObject = createUpdateUserObject(args)
    console.log(updateUser(updateUserObject))
    break
  case 'delete':
    console.log(deleteUser(args[1]))
    break
  default:
    const error = handleError('Comando no encontrado', PATH_FILE_ERROR)
    console.log(error)
    break
}
