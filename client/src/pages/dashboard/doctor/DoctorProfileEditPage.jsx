import { useEffect, useState, useRef } from "react";
import ImageCropper from "../../../components/ImageCropper";
import { BubblesIcon } from "lucide-react";
import authStore from '../../../stores/authStore.js';
import doctorApi from "../../../api/doctorApi.js";
import DoctorProfile from "../../../components/profile/DoctorProfile.jsx";
import Modal from "../../../components/Modal.jsx";
import accountApi from "../../../api/accountApi.js";
import { fetchCsrfToken } from "../../../config/axios.js";
import { useNavigate } from "react-router";

function DoctorProfileEditPage() {
  const user = authStore(state => state.user);
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(!user);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const inputRef = useRef(null);
  const [showPfpModal, setShowPfpModal] = useState(false);
  const [pfpLoading, setPfpLoading] = useState(false);
  const [pfpError, setPfpError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Handle file selection and preview
  const handleFileChange = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPfpError("Only image files are allowed.");
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPfpError("File size must be less than 5MB.");
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }
    setPfpError("");
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setCroppedAreaPixels(null);
  };

  // Drag-and-drop support
  const [isDragging, setIsDragging] = useState(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleAreaClick = () => {
    if (!pfpLoading && !isDragging && !selectedFile) {
      document.getElementById('pfp-file-input').click();
    }
  };

  // Remove/reset selected file
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setPfpError("");
  };

  // Crop and upload handler
  const getCroppedImg = async (imageSrc, crop) => {
    // Utility to crop the image in browser before upload
    const createImage = url => new Promise((resolve, reject) => {
      const img = new window.Image();
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', error => reject(error));
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = url;
    });
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );
    return new Promise((resolve) => {
      canvas.toBlob(blob => {
        resolve(blob);
      }, 'image/jpeg', 0.95);
    });
  };

  const handleProfilePictureUpload = async () => {
    if (!selectedFile) {
      setPfpError("Please select an image to upload.");
      return;
    }
    setPfpLoading(true);
    setPfpError("");
    try {
      let fileToUpload = selectedFile;
      if (previewUrl && croppedAreaPixels) {
        const croppedBlob = await getCroppedImg(previewUrl, croppedAreaPixels);
        fileToUpload = new File([croppedBlob], selectedFile.name, { type: 'image/jpeg' });
      }
      const formData = new FormData();
      formData.append("profilePicture", fileToUpload);
      await fetchCsrfToken();
      await accountApi.uploadProfilePicture(formData);
      
      // Refresh auth data to get updated profile picture URL
      await authStore.getState().checkAuth();
      const updatedUser = authStore.getState().user;
      
      // Force image cache refresh by updating the profile state
      // and adding a timestamp to break browser cache
      if (updatedUser) {
        const profileWithFreshImage = {
          ...updatedUser,
          profilePictureUrl: updatedUser.profilePictureUrl ? 
            `${updatedUser.profilePictureUrl}?t=${Date.now()}` : 
            updatedUser.profilePictureUrl
        };
        setProfile(profileWithFreshImage);
      }
      
      setShowPfpModal(false);
      setSelectedFile(null);
      setPreviewUrl("");
      setCroppedAreaPixels(null);
    } catch (err) {
      console.error("Profile picture upload failed:", err);
      setPfpError("Failed to upload profile picture. Please try again.");
    } finally {
      setPfpLoading(false);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (editField && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editField]);

  useEffect(() => {
    if (!user) {
      setLoading(true);
    } else {
      setProfile(user);
      setLoading(false);
    }
  }, [user]);

  const startEdit = (field, value) => {
    setEditField(field);
    setEditValue(value ?? "");
  };

  const cancelEdit = () => {
    setEditField(null);
    setEditValue("");
    // Do not navigate away; just exit edit mode
  };

  const saveEdit = async (field, value) => {
    setEditLoading(true);
    try {
      if (field === "phone") {
        await fetchCsrfToken();
        await accountApi.updateAccount({ phone: value });
      } else if (field === "firstName_lastName") {
        const payload = { firstName: value.firstName, lastName: value.lastName };
        await doctorApi.updateProfile(payload);
      } else {
        if (!editField) return;
        const payload = { [editField]: editValue };
        await doctorApi.updateProfile(payload);
      }
      await authStore.getState().checkAuth();
      setProfile(authStore.getState().user);
      setEditField(null);
      setEditValue("");
      // Do not navigate away; just exit edit mode and stay on edit page
    } catch {
      alert("Failed to update profile. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleInputKey = (e) => {
    if (e.key === "Enter") {
      saveEdit(editField, editValue);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BubblesIcon className="w-10 h-10 animate-spin text-pri-gr1" />
      </div>
    );
  }

  if (!profile || !profile.Doctor || !profile.Doctor.firstName || !profile.Doctor.lastName) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Doctor profile not found or incomplete.
      </div>
    );
  }

  const handleSpecialtiesSave = async (specialtyIds) => {
    try {
      const ids = specialtyIds.map(s => typeof s === 'object' && s.id ? s.id : s);
      await doctorApi.updateProfile({ specialties: ids });
      await authStore.getState().checkAuth();
      setProfile(authStore.getState().user);
      navigate("/dashboard/doctor/profile");
    } catch (err) {
      console.error("Failed to update specialties:", err);
    }
  };

  return (
    <>
      <DoctorProfile
        profile={profile}
        editField={editField}
        editValue={editValue}
        editLoading={editLoading}
        inputRef={inputRef}
        startEdit={startEdit}
        cancelEdit={cancelEdit}
        saveEdit={() => saveEdit(editField, editValue)}
        setEditValue={setEditValue}
        handleInputKey={handleInputKey}
        onSpecialtiesSave={handleSpecialtiesSave}
        onProfilePictureClick={() => setShowPfpModal(true)}
      />
      <Modal isOpen={showPfpModal} onClose={() => {
        setShowPfpModal(false);
        setSelectedFile(null);
        setPreviewUrl("");
        setPfpError("");
      }} title="Update Profile Picture" maxWidth="max-w-5xl">
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="w-full flex flex-col items-center mb-2">
            {previewUrl ? (
                <div className="w-full relative max-w-3xl">
                  <ImageCropper
                    src={previewUrl}
                    aspectRatio={1}
                    cropShape="round"
                    onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
                    showPreview={false}
                    enableResize={false}
                    className="border-0 shadow-none bg-transparent p-0"
                  />
                  {selectedFile && !pfpLoading && (
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 z-50"
                      onClick={e => { e.stopPropagation(); handleRemoveFile(); }}
                      title="Remove image and select a new one"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
            ) : (
              <div
                className={`w-64 h-64 rounded-xl border-3 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center overflow-hidden relative transition-all duration-300 hover:border-blue-400 hover:shadow-lg ${pfpLoading ? 'opacity-60' : ''} ${isDragging ? 'ring-4 ring-blue-400 border-blue-500 bg-gradient-to-br from-blue-100 to-indigo-100' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{ cursor: 'pointer' }}
                title="Click to browse or drag and drop an image"
                onClick={handleAreaClick}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3 text-blue-500">📸</div>
                  <p className="text-blue-700 font-semibold text-lg mb-1">Choose Your Photo</p>
                  <p className="text-blue-600 text-sm">Drag & drop or click to browse</p>
                  <p className="text-gray-600 text-xs mt-2">Max 5MB • JPG, PNG</p>
                </div>
              </div>
            )}
          </div>
          <input
            id="pfp-file-input"
            type="file"
            accept="image/*"
            disabled={pfpLoading}
            style={{ display: 'none' }}
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />
          <div className="flex gap-3 w-full justify-center">
            <button
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center gap-2"
              onClick={handleProfilePictureUpload}
              disabled={pfpLoading || !selectedFile}
            >
              {pfpLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Save Profile Picture
                </>
              )}
            </button>
            <button
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg"
              onClick={() => {
                setShowPfpModal(false);
                setSelectedFile(null);
                setPreviewUrl("");
                setPfpError("");
              }}
              disabled={pfpLoading}
            >
              Cancel
            </button>
          </div>
          {pfpError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 w-full">
              <div className="flex items-center gap-2 text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">{pfpError}</span>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default DoctorProfileEditPage;
