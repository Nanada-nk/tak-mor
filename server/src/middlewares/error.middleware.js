// import * as Prisma from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientUnknownRequestError
} from '@prisma/client/runtime/library';

import createError from "../utils/create-error.js"

const errorMiddleware = (err, req, res, next) => {
 
  let statusCode = err.statusCode || 500; 
  let message = err.message || 'Internal Server Error'; 
  let errors = {}; 

  
  console.error('--- รายละเอียดข้อผิดพลาด ---');
  console.error(`Path: ${req.path}`);
  console.error(`Method: ${req.method}`);
  console.error(`Status Code: ${statusCode}`);
  console.error(`Error Message: ${message}`);
  
  if (err.field) console.error(`Error Field: ${err.field}`);
  console.error('Stack Trace:', err.stack); 
  console.error('--- สิ้นสุดรายละเอียดข้อผิดพลาด ---');


  if (err.name === 'ValidationError' && Array.isArray(err.inner)) { 
    statusCode = 400; 
    message = 'Validation Error'; 
   
    err.inner.forEach(error => {
      if (error.path) {
        errors[error.path] = error.message; 
      }
    });
  }


  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': 
        statusCode = 409; 
        message = `Duplicate field value: ${err.meta?.target || 'unknown field'}`; 
        break;
      case 'P2025': 
        statusCode = 404; 
        message = `Resource not found: ${err.meta?.modelName || 'unknown model'}`; 
        break;
    
      default:
        statusCode = 500;
        message = 'Database operation failed.'; 
        break;
    }
  }

 
  if (err instanceof PrismaClientValidationError) {
    statusCode = 400; 
    message = 'Invalid input data for database operation.';
  }

  if (err instanceof PrismaClientUnknownRequestError) {
    statusCode = 500; 
    message = 'Unknown database error occurred.';
  }

  if (process.env.NODE_ENV === 'development') {
    return res.status(statusCode).json({
      status: statusCode >= 500 ? 'error' : 'fail', 
      message: message, 
      error: err, 
      stack: err.stack, 
      errors: Object.keys(errors).length > 0 ? errors : undefined, 
    });
  }
  if (statusCode >= 400 && statusCode < 500) {
   
    return res.status(statusCode).json({
      status: 'fail',
      message: message,
      errors: Object.keys(errors).length > 0 ? errors : undefined,
    });
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

export default errorMiddleware;