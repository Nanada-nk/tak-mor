import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import session from 'express-session';
import passport from 'passport';
import csurf from 'csurf';
import authenticateUser from './middlewares/authenticate.middleware.js'
import notFoundMiddleware from './middlewares/not-found.middleware.js'
import errorMiddleware from './middlewares/error.middleware.js'

import dashboardRouter from './routes/dashboard.route.js'
import authRouter from './routes/auth.route.js'
import bookingRouter from './routes/booking.route.js'
import doctorRouter from './routes/doctor.route.js'
import specialtyRouter from './routes/specialty.route.js';
import './config/passport.js';


const app = express()

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 200,
  message: 'Too many requests, please try again later.'
})

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))


app.use(limiter)
app.use(cookieParser())
app.use(express.json())
app.use(morgan("dev"))
app.use(compression())


app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true,
    }
}));


app.use(passport.initialize());
app.use(passport.session());

const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);
app.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

app.use('/api/auth', authRouter);
// app.use('/api/users', authenticateUser, usersRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/doctor', bookingRouter, doctorRouter);
app.use('/api/specialty', specialtyRouter);
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