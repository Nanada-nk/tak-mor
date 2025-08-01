import express from 'express';
import { createAppointment, getAppointmentsByDoctor, getAppointmentsByPatient } from '../controllers/appointment.controller.js';

const appointmentRouter = express.Router();

// Get all appointments for a patient
appointmentRouter.get("/patient/:patientId", getAppointmentsByPatient);

appointmentRouter.post("/", createAppointment);

// Get all appointments for a doctor
appointmentRouter.get("/doctor/:doctorId", getAppointmentsByDoctor);

export default appointmentRouter;