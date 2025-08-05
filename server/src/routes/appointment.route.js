import express from 'express';
import { createAppointment, getAppointmentsByDoctor, getDailyAppointments, getAppointmentsByPatient } from '../controllers/appointment.controller.js';

const appointmentRouter = express.Router();

// Get all appointments for a patient
appointmentRouter.get("/patient/:patientId", getAppointmentsByPatient);

appointmentRouter.post("/", createAppointment);

// Get all appointments for a doctor
appointmentRouter.get("/", getDailyAppointments);
appointmentRouter.get("/doctor/:doctorId", getAppointmentsByDoctor);

export default appointmentRouter;