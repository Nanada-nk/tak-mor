import prisma from "../config/prisma.config.js"
import { httpServer, io } from '../server.js'

export default async function (signal, error = null) {
  console.log(`\n--- Server Shutdown Initiated by: ${signal} ---`)
  try {
    // 1. ปิด HTTP Server (หยุดรับ Request ใหม่)
    if (httpServer && httpServer.listening) {
      console.log('Closing HTTP server...');
      await new Promise(resolve => httpServer.close(resolve)); // ปิดอย่างสง่างาม
      console.log('HTTP server closed.');
    }

    // 2. ปิด Socket.IO Server (ถ้ามี)
    if (io) {
      console.log('Closing Socket.IO server...');
      io.close();
      console.log('Socket.IO server closed.');
    }

    // 3. ตัดการเชื่อมต่อ Database (Prisma)
    console.log('Disconnecting Prisma client...');
    await prisma.$disconnect()
    console.log('Prisma client disconnected.');

  } catch (shutdownError) {
    console.error('Error during graceful shutdown:', shutdownError);

  } finally {
    // 4. Exit Process ด้วยรหัสที่ถูกต้อง
    // 0 = สำเร็จ (สำหรับ SIGINT, SIGTERM)
    // 1 = ล้มเหลว (สำหรับ uncaughtException, unhandledRejection)
    if (signal === "uncaughtException" || signal === "unhandledRejection") {
      console.log('Exiting process with failure code (1).');
      process.exit(1); // Exit ด้วยรหัส 1 เพื่อบอกว่ามี Error เกิดขึ้น
    } else {
      console.log('Exiting process gracefully with success code (0).');
      process.exit(0); // Exit ด้วยรหัส 0 สำหรับการปิดปกติ
    }
  }
}
