import prisma from '../config/prisma.config.js';
import { httpServer, io } from '../server.js'

export default async function (signal, error = null) {
  console.log(`\n--- Server Shutdown Initiated by: ${signal} ---`)
  try {
    
    if (httpServer && httpServer.listening) {
      console.log('Closing HTTP server...');
      await new Promise(resolve => httpServer.close(resolve)); 
      console.log('HTTP server closed.');
    }

    
    if (io) {
      console.log('Closing Socket.IO server...');
      io.close();
      console.log('Socket.IO server closed.');
    }

  
    console.log('Disconnecting Prisma client...');
    await prisma.$disconnect()
    console.log('Prisma client disconnected.');

  } catch (shutdownError) {
    console.error('Error during graceful shutdown:', shutdownError);

  } finally {
    if (signal === "uncaughtException" || signal === "unhandledRejection") {
      console.log('Exiting process with failure code (1).');
      process.exit(1); 
    } else {
      console.log('Exiting process gracefully with success code (0).');
      process.exit(0); 
    }
  }
}
