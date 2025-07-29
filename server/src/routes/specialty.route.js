import express from 'express';
import { createSpecialty, getAllSpecialties } from '../controllers/specialty.controller.js';
import authenticateUser from '../middlewares/authenticate.middleware.js';

const specialtyRouter = express.Router();

specialtyRouter.get('/', getAllSpecialties);
specialtyRouter.post('/', authenticateUser, createSpecialty);

export default specialtyRouter;
