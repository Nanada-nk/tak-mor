// import express from 'express'
// import cors from 'cors'
// import compression from 'compression'
// import morgan from 'morgan'
// import rateLimit from 'express-rate-limit'
// import authenticateUser from './middlewares/authenticate.middleware.js'
// import notFoundMiddleware from './middlewares/not-found.middleware.js'
// import errorMiddleware from './middlewares/error.middleware.js'


// const app = express()

// const limiter = rateLimit({
//   windowMs: 60 * 60 * 1000,
//   max: 200,
//   message: 'Too many requests, please try again later.'
// })

// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   credentials: true
// }))
// app.use(limiter)
// app.use(express.json())
// app.use(morgan("dev"))
// app.use(compression())

// // app.use('/api/auth', authRouter);
// // app.use('/api/users', authenticateUser, usersRouter);

// app.use(notFoundMiddleware)
// app.use(errorMiddleware)

// export default app