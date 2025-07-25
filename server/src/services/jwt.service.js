import jwt from 'jsonwebtoken'

const jwtService = {}

jwtService.genAccessToken = async (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "15m"
    })
  } catch (error) {
    throw new Error('Invalid token!')
  }
}

jwtService.genRefreshToken = async (userId) => {
  try {
    return jwt.sign(
      { id: userId },
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: '7d'}
    )
  } catch (error) {
    throw new Error("Invalid token!!");
  }
}

jwtService.verifyToken = async (token, secret) => {
  try {
    return jwt.verify(token,secret,{
      algorithms: ['HS256']
    })
  } catch (error) {
    throw new Error('Invalid token!!!')
  }
}



export default jwtService
