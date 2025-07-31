import axiosInstance from "../config/axios.js";

const accountApi = {};

// Update account info (phone, profilePictureUrl, etc.)
accountApi.updateAccount = (body) => {
  return axiosInstance.put("/api/account", body);
};

export default accountApi;
