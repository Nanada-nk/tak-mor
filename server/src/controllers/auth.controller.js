// import authService from "../services/auth.service.js"
// import hashService from "../services/hash.service.js"
// import jwtService from "../services/jwt.service.js"
// import createError from "../utils/create-error.js"



// const authController = {}

// authController.register = async (req, res, next) => {
//   const { firstName, lastName, mobile, email, password, confirmPassword } = req.body;


//   if (password !== confirmPassword) {
//     throw createError(400, 'Password and Confirm Password do not match')
//   }

//   const findEmail = await authService.findUserByEmail(email)
//   if (findEmail) {
//     throw createError(400, 'Email already exists')
//   }

//   const hashPassword = await hashService.hash(password)
//   // console.log('hashPassword', hashPassword)

//   const data = {
//     firstName,
//     lastName,
//     mobile,
//     email,
//     password: hashPassword,
//     profileImage: null
//   };

//   const newUser = await authService.createUser(data)
//   res.status(201).json({ message: "Register User Successfully", user: newUser })
// }


// authController.login = async (req, res, next) => {
//   const { email, password } = req.body
//   const findEmail = await authService.findUserByEmail(email)
//   if (!findEmail) {
//     throw createError(401, 'Email or password invalid!')
//   }

//   if (!findEmail.enabled) {
//     throw createError(403, "Your account has been disabled. Please contact support.");
//   }

//   const isMatchPassword = await hashService.comparePassword(password, findEmail.password)
//   if (!isMatchPassword) {
//     throw createError(401, 'Email or password invalid!!')
//   }
//   await authService.updateLastLogin(findEmail.id)


//   const accessToken = await jwtService.genToken({ id: findEmail.id, role: findEmail.role })
//   const { password: userPassword, ...userWithoutPassword } = findEmail;
//   res.status(200).json({
//     success: true,
//     accessToken,
//     user: userWithoutPassword
//   });
// }

// authController.getMe = async (req, res, next) => {
//   if (!req.user) {
//     throw createError(401, "Unauthorization")
//   }
//   const user = req.user
//   if (!user) {
//     throw createError(404, "User not found");
//   }

//   const { password, ...userWithoutPassword } = user

//   res.status(200).json({ user: userWithoutPassword })
// }


// authController.forgotPassword = async (req, res, next) => {
//   const { email } = req.body;
//   if (!email) throw createError(400, "Email is required.");

//   await authService.requestPasswordReset(email);

//   res.status(200).json({ message: "Password reset link sent." });
// };


// authController.resetPassword = async (req, res, next) => {
//   const { token, newPassword } = req.body;
//   if (!token || !newPassword) throw createError(400, "Token and new password are required.");

//   await authService.resetPasswordWithToken(token, newPassword);

//   res.status(200).json({ message: "Password has been reset successfully." });
// };

// export default authController