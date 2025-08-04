import adminTeleService from '../services/admin.tele.service.js'
import { StatusCodes } from 'http-status-codes'

const adminTeleController = {}

adminTeleController.createTeleAppointment = async (req, res, next) => {
  try {
    const appointmentData = req.body;
    const newAppointment = await adminTeleService.createTeleAppointment(appointmentData);
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      message: 'Telemedicine appointment created successfully.',
      data: newAppointment,
    });
  } catch (error) {
    next(error);
  }
}

adminTeleController.getAppointmentDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await adminTeleService.getAppointmentDetails(parseInt(id));

    if (!appointment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'fail',
        message: `Appointment with ID ${id} not found.`,
      });
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
}

adminTeleController.getAppointmentByRoomId = async (req, res, next) => {
  try {
    const { roomId } = req.params; // ดึง Room ID จาก params
    const appointment = await adminTeleService.getAppointmentByRoomId(roomId);

    if (!appointment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'fail',
        message: `Appointment with Room ID ${roomId} not found.`,
      });
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
}

adminTeleController.updateAppointmentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;


    const updatedAppointment = await adminTeleService.updateAppointmentStatus(parseInt(id), newStatus);


    res.status(StatusCodes.OK).json({
      status: 'success',
      message: `Appointment ${id} status updated to ${newStatus}.`,
      data: updatedAppointment,
    });
  } catch (error) {
    if (error.message.includes('not found')) {
        return res.status(StatusCodes.NOT_FOUND).json({
            status: 'fail',
            message: error.message,
        });
    }
    next(error);
  }
}

adminTeleController.deleteTeleAppointment = async (req, res, next) => {
  try {

    const { id } = req.params;
    const isDeleted = await adminTeleService.deleteTeleAppointment(parseInt(id));

    if (!isDeleted) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'fail',
        message: `Appointment with ID ${id} not found or could not be deleted.`,
      });
    }

    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
}

export default adminTeleController