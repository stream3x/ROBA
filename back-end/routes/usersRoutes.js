import express from 'express';
import {
  addNewUser,
  login,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUsersByName
} from '../controllers/usersController.js'

const usersRoute = express.Router()

usersRoute.post('/register', addNewUser);
usersRoute.post('/login', login);
usersRoute.get('/', getAllUsers);
usersRoute.get('/:userId', getUserById);
usersRoute.get('/byemail/:userEmail', getUserByEmail);
usersRoute.get('/byname/name', getUsersByName)


export default usersRoute;
