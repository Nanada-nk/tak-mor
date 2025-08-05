import express from 'express';
import { createAppointment, getAppointmentsByDoctor, getDailyAppointments, getAppointmentsByPatient } from '../controllers/appointment.controller.js';

const appointmentRouter = express.Router();


appointmentRouter.get("/patient/:patientId", getAppointmentsByPatient);

appointmentRouter.post("/", createAppointment);


appointmentRouter.get("/", getDailyAppointments);
appointmentRouter.get("/doctor/:doctorId", getAppointmentsByDoctor);

export default appointmentRouter;