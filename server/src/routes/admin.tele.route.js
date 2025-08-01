import express from 'express'
import adminTeleController from '../controllers/admin.tele.controller.js'


const adminTeleRouter = express.Router()

adminTeleRouter.post('/',  adminTeleController.createTeleAppointment)
adminTeleRouter.get('/:id',  adminTeleController.getAppointmentDetails)
adminTeleRouter.get('/byRoomId/:roomId', adminTeleController.getAppointmentByRoomId);
adminTeleRouter.patch('/:id/status',  adminTeleController.updateAppointmentStatus)
adminTeleRouter.delete('/:id',  adminTeleController.deleteTeleAppointment)

export default adminTeleRouter