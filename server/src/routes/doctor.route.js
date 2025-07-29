import express from 'express'
import { getAllDoctors, getDoctorById, getDoctorAvailabilityByDay } from '../controllers/doctor.controller.js';

const doctorRouter = express.Router();



doctorRouter.get("/", getAllDoctors);
doctorRouter.get("/:id", getDoctorById);
doctorRouter.get("/:id/availability", getDoctorAvailabilityByDay);


export default doctorRouter



