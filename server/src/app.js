import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import authenticateUser from './middlewares/authenticate.middleware.js'
import notFoundMiddleware from './middlewares/not-found.middleware.js'
import errorMiddleware from './middlewares/error.middleware.js'
import dashboardRouter from './routes/dashboard.route.js'
import authRouter from './routes/auth.route.js'
<<<<<<< HEAD
import cookieParser from 'cookie-parser'
=======
import bookingRouter from './routes/booking.route.js'

>>>>>>> ae9d3cd92ebc82c4ab0e514dce71d00d1bdefd9c

const app = express()

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 200,
  message: 'Too many requests, please try again later.'
})

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

//ByNada
app.use(cookieParser())
app.use(limiter)
app.use(express.json())
app.use(morgan("dev"))
app.use(compression())

app.use('/api/auth', authRouter);
// app.use('/api/users', authenticateUser, usersRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/doctor', bookingRouter);
// app.use('/api/patient', ()=>{});
// app.use('/api/tele', ()=>{});
// app.use('/api/prescription', ()=>{});
// app.use('/api/booking', ()=>{});
// app.use('/api/news', ()=>{});
// app.use('/api/googleMap', ()=>{});
// app.use('/api/review', ()=>{});

app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app