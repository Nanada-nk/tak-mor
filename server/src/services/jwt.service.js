import jwt from 'jsonwebtoken'

const jwtService = {}

jwtService.genToken = async (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "15d"
    })
  } catch (error) {
    throw new Error('Error generating token')
  }
}

jwtService.verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    })
  } catch (error) {
    throw new Error('Invalid token')
  }
}

jwtService.refreshToken = async (userId) => {
  try {
    return jwt.sign(
      { id: userId },
      process.env.REFRESH_TOKEN_SECRET || 'your_super_strong_refresh_secret',
      {expiresIn: '1m'}
    )
  } catch (error) {
    throw new Error("Error generating refresh token");
  }
}

jwtService.newAccessToken = async (userId) => {
  try {
    return jwt.sign(
       { userId: userId },
       process.env.ACCESS_SECRET || 'access-secret',
       {expiresIn: '20s'}
    )
  } catch (error) {
    throw new Error("Error generating newAccessToken");
  }
}

export default jwtService
