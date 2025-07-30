import express from 'express'
import { createProfile, getProfile, updateProfile } from '../controllers/patient.controller.js';

const patientRouter = express.Router();



patientRouter.post("/:patientId/profile", createProfile );
patientRouter.get("/:patientId/profile", getProfile);
patientRouter.put("/:patientId/profile", updateProfile );



export default patientRouter
