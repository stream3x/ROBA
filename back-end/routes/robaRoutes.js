import express from 'express';
import { addNewRoba, getAllRoba, getRobaById } from '../controllers/robaController.js'

const robaRoute = express.Router();

robaRoute.post('/new', addNewRoba);
robaRoute.get('/', getAllRoba);
robaRoute.get('/:robaId', getRobaById)

export default robaRoute;
