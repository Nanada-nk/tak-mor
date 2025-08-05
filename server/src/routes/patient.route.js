import express from 'express'
import { createProfile, getProfile, updateProfile, updatePatientInfo, getAllPatients, updatePatient } from '../controllers/patient.controller.js';

const patientRouter = express.Router();



patientRouter.get("/", getAllPatients);
patientRouter.post("/:patientId/profile", createProfile );
patientRouter.get("/:patientId/profile", getProfile);
patientRouter.put("/:patientId/profile", updateProfile );
patientRouter.put('/:patientId/info', updatePatientInfo);
patientRouter.put('/:id', updatePatient);



export default patientRouter
