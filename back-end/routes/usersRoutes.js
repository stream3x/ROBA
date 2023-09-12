import express from 'express';
import {
  addNewUser,
  login,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUsersByName
} from '../controllers/usersController.js'
import { authenticationToken } from '../middlewares/userValidation.js';

const usersRoute = express.Router()

usersRoute.post('/register', addNewUser);
usersRoute.post('/login', login);
usersRoute.get('/', authenticationToken, getAllUsers);
usersRoute.get('/:userId', authenticationToken, getUserById);
usersRoute.get('/byemail/:userEmail', authenticationToken, getUserByEmail);
usersRoute.get('/byname/name', authenticationToken, getUsersByName)


export default usersRoute;
