import express from 'express'
import { createProfile, getProfile, updateProfile, updatePatientInfo } from '../controllers/patient.controller.js';

const patientRouter = express.Router();



patientRouter.post("/:patientId/profile", createProfile );
patientRouter.get("/:patientId/profile", getProfile);
patientRouter.put("/:patientId/profile", updateProfile );
patientRouter.put('/:patientId/info', updatePatientInfo);



export default patientRouter
