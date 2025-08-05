import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import session from 'express-session';
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import passport from 'passport';
import csurf from 'csurf';
import http from 'http'

import authenticateUser from './middlewares/authenticate.middleware.js'
import notFoundMiddleware from './middlewares/not-found.middleware.js'
import errorMiddleware from './middlewares/error.middleware.js'

import './config/passport.js';

import dashboardRouter from './routes/dashboard.route.js'
import authRouter from './routes/auth.route.js'
import bookingRouter from './routes/booking.route.js'
import doctorRouter from './routes/doctor.route.js'
import specialtyRouter from './routes/specialty.route.js';
import patientRouter from './routes/patient.route.js'
import appointmentRouter from './routes/appointment.route.js'
import teleRouter from './routes/tele.route.js'
import paymentRouter from './routes/payment.route.js'
import adminTeleRouter from './routes/admin.tele.route.js';
import accountRouter from './routes/account.route.js'


const app = express()

app.use(helmet())

const allowedOrigins = [
  process.env.FRONTEND_URL,
]


app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy does not allow access from Origin: ${origin}`), false);
    }
  },
  credentials: true, 
}));


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 200, 
  message: 'Too many requests from this IP, please try again after 1 minute.',
  standardHeaders: true, 
  legacyHeaders: false 
})
app.use(limiter)

app.use(cookieParser())


app.use(express.json({limit: '10mb'})) 
app.use(express.urlencoded({extended: true, limit: '10mb'})) 

app.use(morgan("dev"))
app.use(compression())


app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,                      
  saveUninitialized: false,           
  cookie: {
    
    secure: process.env.NODE_ENV === 'production' || process.env.BACKEND_URL.startsWith('https'),
    httpOnly: true,                   
    maxAge: 1000 * 60 * 60 * 24,      
    sameSite: 'Lax',                  
  },

}));


app.use(passport.initialize());
app.use(passport.session());


const csrfProtection = csurf({ cookie: true });
app.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});


app.use('/api/auth', authRouter);
// app.use('/api/users', authenticateUser, usersRouter);
app.use('/api/account', accountRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/doctor', bookingRouter, doctorRouter);
app.use('/api/specialty', specialtyRouter);
app.use('/api/patient', patientRouter);
app.use('/api/appointment', appointmentRouter);

app.use('/api/payment', paymentRouter);
// app.use('/api/tele', ()=>{});
// app.use('/api/patient', ()=>{});

app.use('/api/tele', teleRouter);
app.use('/api/admin/tele', adminTeleRouter);
// app.use('/api/prescription', ()=>{});
// app.use('/api/booking', ()=>{});
// app.use('/api/news', ()=>{});
// app.use('/api/googleMap', ()=>{});
// app.use('/api/review', ()=>{});


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const httpServer = http.createServer(app);

export { app, httpServer }
