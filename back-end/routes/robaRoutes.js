import express from 'express';
import { addNewRoba } from '../controllers/robaController.js'

const robaRoute = express.Router();

robaRoute.post('/new', addNewRoba);

export default robaRoute;
