import jwtService from "../services/jwt.service.js"
import createError from "../utils/create-error.js"
import authService from "../services/auth.service.js"

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createError(401, 'Unauthorized'))
  }

  const token = authHeader.split(" ")[1]
  if (!token) {
    return next(createError(401, 'Unauthorized'))
  }

  try {
    const payload = await jwtService.verifyToken(token)
    console.log("decoded JWT", payload)
    if (!payload.id) {
      return next(createError(401, 'Unauthorized'))
    }
    
    const user = await authService.findAccountById(payload.id)
    if (!user) {
      return next(createError(403, 'Unauthorized User not found'))
    }
    
    req.user = user
    
    console.log("User from DB", user)
    console.log("User ID:", req.user)
    next()
  } catch (error) {
    return next(createError(401, 'Invalid token'))
  }
}

export default authenticateUser
