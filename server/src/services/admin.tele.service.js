import prisma from "../config/prisma.config.js"
import generateRoomId from '../utils/tele.util.js'


const adminTeleService = {}

adminTeleService.createTeleAppointment = async (appointmentData) => {
  const {
    patientId,
    doctorId,
    date,
    startTime,
    endTime,
    vn,
    duration,
    price,
    paymentId,
    symptoms
  } = appointmentData;


  if (!patientId || !doctorId || !date || !startTime || !endTime || !vn) {
    throw new Error('Missing required appointment data: patientId, doctorId, date, startTime, endTime, and vn are necessary.');
  }

 
  const combinedScheduledTime = `${date}T${startTime}:00`;
  const tempAppointmentIdForRoom = `${patientId}-${doctorId}-${new Date(combinedScheduledTime).getTime()}`;

  let videoRoomId; 
  try {
    videoRoomId = generateRoomId(tempAppointmentIdForRoom); 
    if (!videoRoomId) {
      throw new Error('Failed to generate a valid room ID.');
    }
  } catch (error) {
    throw new Error(`Error generating room ID: ${error.message}`);
  }


  const finalDuration = duration || null;
  const finalPrice = price || null;
  const finalPaymentId = paymentId || null;
  const finalSymptoms = symptoms || null; 

try {

    const newAppointment = await prisma.appointment.create({
      data: {
        vn: vn,
        patientId: patientId,
        doctorId: doctorId,
        date: new Date(date),        
        startTime: startTime,
        endTime: endTime,
        duration: finalDuration,
        symptoms: finalSymptoms,
        status: 'PENDING',           
        price: finalPrice,
        paymentId: finalPaymentId,
        roomId: videoRoomId,        
      },
      select: { // เลือกคอลัมน์ที่ต้องการให้ Prisma คืนกลับมา (เพื่อให้ Controller ส่งกลับ Frontend ได้)
        id: true, vn: true, patientId: true, doctorId: true, date: true, startTime: true, endTime: true,
        duration: true, symptoms: true, status: true, price: true, paymentId: true, roomId: true,
        createdAt: true, updatedAt: true,
      },
    });

    console.log('New telemedicine appointment successfully recorded in MySQL:', newAppointment);
    return newAppointment;

  } catch (error) {
    console.error('Prisma error during appointment creation:', error);
    // จัดการ Error ที่มาจาก Prisma (เช่น Unique constraint violation P2002)
    if (error.code === 'P2002') { // เป็น Error Code สำหรับ Unique constraint violation
        if (error.meta?.target?.includes('vn')) {
            throw new Error('A duplicate VN entry occurred. VN must be unique.');
        }
        if (error.meta?.target?.includes('roomId')) {
            throw new Error('A duplicate Room ID entry occurred. Room ID must be unique.');
        }
    }
    throw new Error(`Failed to create appointment due to a database error: ${error.message || 'Unknown Prisma error'}`);
  }
}


adminTeleService.getAppointmentDetails = async (id) => {
  if (!id || (typeof id !== 'string' && typeof id !== 'number') || String(id).trim() === '') {
    throw new Error('Appointment ID is required.');
  }

try {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: id, 
      },
      select: { 
        id: true, vn: true, patientId: true, doctorId: true, date: true, startTime: true, endTime: true,
        duration: true, symptoms: true, status: true, price: true, paymentId: true, roomId: true,
        createdAt: true, updatedAt: true,
      },
    });

    if (!appointment) {
      console.warn(`Appointment with ID ${id} not found.`);
      return null;
    }
    return appointment; 

  } catch (error) {
    console.error(`Prisma error fetching appointment ${id}:`, error);
    throw new Error(`Failed to retrieve appointment details due to a database error: ${error.message || 'Unknown Prisma error'}`);
  }
}

adminTeleService.getAppointmentByRoomId = async (roomId) => {
  if (!roomId || typeof roomId !== 'string' || roomId.trim() === '') {
    throw new Error('Room ID is required to fetch appointment details.');
  }

try {   
    const appointment = await prisma.appointment.findUnique({ 
      where: {
        roomId: roomId,
      },
      select: { 
        id: true, vn: true, patientId: true, doctorId: true, date: true, startTime: true, endTime: true,
        duration: true, symptoms: true, status: true, price: true, paymentId: true, roomId: true,
        createdAt: true, updatedAt: true,
      },
    });

    if (!appointment) {
      console.warn(`Appointment with Room ID ${roomId} not found.`);
      return null;
    }
    return appointment;

  } catch (error) {
    console.error(`Prisma error fetching appointment by Room ID ${roomId}:`, error);
    throw new Error(`Failed to retrieve appointment details by Room ID due to a database error: ${error.message || 'Unknown Prisma error'}`);
  }
}

adminTeleService.updateAppointmentStatus = async (id, newStatus) => {
  if (!id || (typeof id !== 'string' && typeof id !== 'number') || String(id).trim() === '') {
    throw new Error('Appointment ID is required for status update.');
  }
  if (!newStatus || typeof newStatus !== 'string' || newStatus.trim() === '') {
    throw new Error('New status is required.');
  }

  const validStatuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
  const statusToUpdate = newStatus.toUpperCase();
  if (!validStatuses.includes(statusToUpdate)) {
    throw new Error(`Invalid status: ${newStatus}. Valid statuses are: ${validStatuses.join(', ')}.`);
  }

  try {
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        status: statusToUpdate,
      },
      select: { 
        id: true, vn: true, patientId: true, doctorId: true, date: true, startTime: true, endTime: true,
        duration: true, symptoms: true, status: true, price: true, paymentId: true, roomId: true,
        createdAt: true, updatedAt: true,
      },
    });

    console.log(`Appointment ${id} updated to status: ${statusToUpdate}`);
    return updatedAppointment;

  } catch (error) {
    console.error(`Prisma error updating appointment ${id}:`, error);
    if (error.code === 'P2025') { 
        throw new Error(`Appointment with ID ${id} not found for update.`);
    }
    throw new Error(`Failed to update appointment status due to a database error: ${error.message || 'Unknown Prisma error'}`);
  }
}

adminTeleService.deleteTeleAppointment = async (id) => {
  if (!id || (typeof id !== 'string' && typeof id !== 'number') || String(id).trim() === '') {
    throw new Error('Appointment ID is required for deletion.');
  }

try {
    
  await prisma.appointment.delete({
      where: {
        id: id,
      },
      select: { 
        id: true,
      }
    });

    console.log(`Appointment ${id} successfully deleted.`);
    return true; 

  } catch (error) {
    console.error(`Prisma error deleting appointment ${id}:`, error);
    if (error.code === 'P2025') { 
        console.warn(`Appointment ${id} not found or could not be deleted.`);
        return false;
    }
    throw new Error(`Failed to delete appointment due to a database error: ${error.message || 'Unknown Prisma error'}`);
  }
}

export default adminTeleService