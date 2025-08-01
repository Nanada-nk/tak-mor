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
  // เพิ่ม URL อื่นๆ ที่อนุญาต เช่น Production Frontend URL
  // 'https://your-production-frontend.com'
]

// app.use(cors({
//   // origin: process.env.FRONTEND_URL,
//   // credentials: true
// }))


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


// const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000,
//   max: 200,
//   message: 'Too many requests, please try again later.'
// })


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 200, // อนุญาต 200 requests ต่อ 1 นาที ต่อ IP
  message: 'Too many requests from this IP, please try again after 1 minute.',
  standardHeaders: true, // ส่ง RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset headers
  legacyHeaders: false // ไม่ส่ง X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset headers
})
app.use(limiter)

app.use(cookieParser())

// Body Parsers (สำหรับอ่านข้อมูลจาก Request Body)
// app.use(express.json())
app.use(express.json({limit: '10mb'})) // สำหรับ JSON payloads
app.use(express.urlencoded({extended: true, limit: '10mb'})) // สำหรับ URL-encoded payloads

app.use(morgan("dev"))
app.use(compression())


// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: process.env.NODE_ENV === 'production',
//     httpOnly: true,
//   }
// }));

app.use(session({
  secret: process.env.SESSION_SECRET, // Secret key สำหรับเซ็นต์ Session ID cookie (ต้องยาวและสุ่มมากๆ)
  resave: false,                      // ไม่ต้องบันทึก Session ซ้ำถ้าไม่มีการเปลี่ยนแปลง
  saveUninitialized: false,           // ไม่ต้องบันทึก Session ที่ยังไม่มีการเปลี่ยนแปลง
  cookie: {
    // secure: true ใน Production เมื่อใช้ HTTPS, false ใน Development (ถ้าไม่ใช้ HTTPS)
    secure: process.env.NODE_ENV === 'production' || process.env.BACKEND_URL.startsWith('https'),
    httpOnly: true,                   // ป้องกันการเข้าถึง cookie ผ่าน client-side script
    maxAge: 1000 * 60 * 60 * 24,      // อายุของ cookie (เช่น 24 ชั่วโมง)
    sameSite: 'Lax',                  // ป้องกัน CSRF ในระดับหนึ่ง (สามารถเป็น 'Strict' หรือ 'None' ขึ้นอยู่กับ Use Case)
  },
  // Best Practice: ใน Production ควรใช้ External Session Store เช่น Redis
  // store: new RedisStore({ client: redisClient }),
}));


app.use(passport.initialize());
app.use(passport.session());

// const csrfProtection = csurf({ cookie: true });
// app.use(csrfProtection);
// app.get('/csrf-token', (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });

const csrfProtection = csurf({ cookie: true });
app.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// // ******** เริ่มการแก้ไขตรงนี้เลยค่ะ ********
// // สร้าง instance ของ csrfProtection (ยังคงอยู่)
// const csrfProtection = csurf({ cookie: true });

// // Middleware ที่จะยกเว้นบาง Path จาก CSRF Protection
// app.use((req, res, next) => {
//   // กำหนดรายการ API ที่จะยกเว้นจาก CSRF (สำหรับ Postman)
//   const exemptedPaths = [
//     { path: '/api/auth/login', method: 'POST' },
//     { path: '/api/admin/tele', method: 'POST' } // <-- เพิ่มบรรทัดนี้เข้ามา!
//     // เพิ่ม API อื่นๆ ที่เป็น POST/PUT/PATCH/DELETE ที่คุณต้องการยิงด้วย Postman โดยไม่ต้องมี CSRF
//     // เช่น { path: '/api/admin/tele/byRoomId/:roomId', method: 'GET' } ไม่ต้องยกเว้นเพราะเป็น GET ไม่ต้องใช้ CSRF
//     // แต่ถ้ามี PATCH/PUT/DELETE อื่นๆ ของ admin ก็ต้องเพิ่มเข้ามา
//   ];

//   // ตรวจสอบว่า Request นั้นเป็นหนึ่งใน Path ที่ยกเว้นหรือไม่
//   const isExempted = exemptedPaths.some(exempt =>
//     req.path === exempt.path && req.method === exempt.method
//   );

//   if (isExempted) {
//     return next(); // ถ้าเป็น Path ที่ยกเว้น ให้ข้าม csrfProtection ไป
//   }

//   // ถ้าไม่ใช่ Request ที่ยกเว้น ให้ใช้ csrfProtection ปกติ
//   csrfProtection(req, res, next);
// });

// // Endpoint สำหรับให้ Frontend ดึง CSRF Token (ยังคงต้องมีอยู่)
// app.get('/csrf-token', (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });
// // ******** สิ้นสุดการแก้ไขตรงนี้ค่ะ ********


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

// --- 8. Health Check Endpoint ---
// Endpoint สำหรับตรวจสอบสถานะของ Server (ใช้ใน Load Balancer, Kubernetes)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const httpServer = http.createServer(app);

export { app, httpServer }
