import axiosInstance from "../config/axios.js";

const accountApi = {};


accountApi.uploadProfilePicture = (formData) => {
  return axiosInstance.post("/api/account/upload-profile-picture", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


accountApi.updateAccount = (body) => {
  return axiosInstance.put("/api/account", body);
};

export default accountApi;


accountApi.changePassword = (body) => {
  return axiosInstance.put('/api/account/change-password', body);
};
