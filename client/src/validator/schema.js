import * as Yup from 'yup'

export const schemaRegister = Yup.object({
  firstName:
    Yup.string()
      .required("First name is required"),
  lastName:
    Yup.string()
      .required("Last name is required"),
  mobile:
    Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits (e.g. 0811111111)")
      .required("Mobile is required"),
  email:
    Yup.string()
      .email("Email is invalid")
      .max(30, "Email must be at most 30 characters")
      .required("Email is required"),
  password:
    Yup.string()
      .max(30, "Password must be at most 30 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
        "Password must be at least 8 characters and include uppercase, lowercase, and a number")
      .required("Password is required"),
  confirmPassword:
    Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required")
}).noUnknown()

export const schemaLogin = Yup.object({
  email:
    Yup.string()
      .email("Email is invalid")
      .max(30, "Email must be at most 30 characters")
      .required("Email is required"),
  password:
    Yup.string()
      .max(30, "Password must be at most 30 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
        "Password must be at least 8 characters and include uppercase, lowercase, and a number")
      .required("Password is required")
}).noUnknown()


export const schemaForgotPassword = Yup.object({
  email:
    Yup.string()
      .email("Email is invalid")
      .max(30, "Email must be at most 30 characters")
      .required("Email is required")
}).noUnknown()


export const schemaResetPassword = Yup.object({
  newPassword:
    Yup.string()
      .max(30, "Password must be at most 30 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
        "Password must be at least 8 characters and include uppercase, lowercase, and a number")
      .required("Password is required"),
  confirmNewPassword:
    Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required")
}).noUnknown()

export const schemaEditProfile = Yup.object({
  firstName:
    Yup.string()
      .required("First name is required"),
  lastName:
    Yup.string()
      .required("Last name is required"),
  mobile:
    Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits (e.g. 0811111111)")
      .required("Mobile is required"),
  email:
    Yup.string()
      .email("Email is invalid")
      .max(30, "Email must be at most 30 characters")
      .required("Email is required")
}).noUnknown(true)

export const schemaAddress = Yup.object({
  address:
    Yup.string()
      .max(250, "Address must be at most 250 characters")
      .required("Address is required")
}).noUnknown(true)

export const schemaChangePassword = Yup.object({
  currentPassword:
    Yup.string()
      .max(30, "Password must be at most 30 characters")
      .required('Please enter current password.'),
  newPassword:
    Yup.string()
      .max(30, "Password must be at most 30 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
        "Password must be at least 8 characters and include uppercase, lowercase, and a number")
      .required("Password is required"),
  confirmNewPassword:
    Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required")
}).noUnknown(true)

export const categorySchema = Yup.object({
  name: Yup.string().required("name is required."),
}).noUnknown(true)

export const productSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().positive().required(),
  stockQuantity: Yup.number().integer().min(0).required(),
  categoryId: Yup.number().required("Please select a category."),
}).noUnknown(true)

export const editUserSchema = Yup.object({
  role: Yup.string().required("Please select a role"),
}).noUnknown(true)

export const orderStatusSchema = Yup.object({
  orderStatus: Yup.string().required(),
  trackingNumber: Yup.string().nullable(),
}).noUnknown(true)

export const couponSchema = Yup.object({
  code: Yup.string().required(),
  discount: Yup.number().min(1).max(100).required(),
  expiredAt: Yup.date().required(),
  usageLimit: Yup.number().min(0).integer(),
}).noUnknown(true)

export const reviewSchema = Yup.object({
  rating: Yup.number().min(1, "Please provide a rating.").required(),
  comment: Yup.string(),
}).noUnknown(true)

