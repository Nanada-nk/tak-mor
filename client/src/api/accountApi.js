import axiosInstance from "../config/axios.js";

const accountApi = {};

// Upload profile picture (multipart/form-data)
accountApi.uploadProfilePicture = (formData) => {
  return axiosInstance.post("/api/account/upload-profile-picture", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Update account info (phone, profilePictureUrl, etc.)
accountApi.updateAccount = (body) => {
  return axiosInstance.put("/api/account", body);
};

export default accountApi;
