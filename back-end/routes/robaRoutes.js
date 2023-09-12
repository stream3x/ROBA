import express from 'express';
import { addNewRoba, getAllRoba, getRobaById } from '../controllers/robaController.js'
import { authenticationToken } from '../middlewares/userValidation.js';

const robaRoute = express.Router();

robaRoute.get('/', authenticationToken, getAllRoba);
robaRoute.post('/new', authenticationToken, addNewRoba);
robaRoute.get('/:robaId', authenticationToken, getRobaById)

export default robaRoute;
