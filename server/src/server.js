import dotenv from 'dotenv'
// import app from "./app.js"
import { app, httpServer } from "./app.js"
import shutdownUtil from './utils/shutdown.util.js'
import { Server as SocketIOServer } from 'socket.io'



dotenv.config()

const PORT = process.env.PORT || 8000

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
})

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  })
})

httpServer.listen(PORT, () => console.log(`Server on : http://localhost:${PORT}`))
// app.listen(PORT,()=> console.log(`Server on : http://localhost:${PORT}`)) 

process.on("SIGINT", () => shutdownUtil("SIGINT"))
process.on("SIGTERM", () => shutdownUtil("SIGTERM"))

process.on("uncaughtException", () => shutdownUtil("uncaughtException"))
process.on("unhandledRejection", () => shutdownUtil("unhandledRejection"))