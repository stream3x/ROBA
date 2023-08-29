import express from 'express';
import {
  addNewUser,
  getAllUsers,
  getUserById
} from '../controllers/usersController.js'

const usersRoute = express.Router()

usersRoute.post('/register', addNewUser);
usersRoute.get('/', getAllUsers);
usersRoute.get('/:userId', getUserById);


export default usersRoute;
