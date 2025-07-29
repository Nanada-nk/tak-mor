import express from 'express'
import { getAllDoctors, getDoctorById, getDoctorAvailabilityByDay, updateDoctorProfile } from '../controllers/doctor.controller.js';
import authenticateUser from '../middlewares/authenticate.middleware.js';

const doctorRouter = express.Router();



doctorRouter.get("/", getAllDoctors);
doctorRouter.get("/:id", getDoctorById);
doctorRouter.get("/:id/availability", getDoctorAvailabilityByDay);
doctorRouter.put("/profile", authenticateUser, updateDoctorProfile);



export default doctorRouter



