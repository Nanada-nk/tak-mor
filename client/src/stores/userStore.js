import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import authStore from "./authStore.js";

const userStore = create(
  persist(
    (set, get) => ({
      patientProfile: null,
      doctorProfile: null,
      isLoadingProfile: false,
      setPatientProfile: (profileData) => set({ patientProfile: profileData }),
      setDoctorProfile: (profileData) => set({ doctorProfile: profileData }),

      fetchUserProfile: () => {
        set({ isLoadingProfile: true })
        const currentUser = authStore.getState().user

        if (currentUser) {
          if (currentUser.role === 'PATIENT' && currentUser.Patient) {

            get().setPatientProfile({
              id: currentUser.Patient.id,
              accountId: currentUser.id,
              email: currentUser.email ?? '',
              phone: currentUser.phone ?? '',
              hn: currentUser.Patient.hn ?? '',
              firstName: currentUser.Patient.firstName ?? '',
              lastName: currentUser.Patient.lastName ?? '',
              address: currentUser.Patient.address ?? '',
              birthDate: currentUser.Patient.birthDate ?? null,
              appointment: currentUser.Patient.Appointment ?? [],
              medicalFile: currentUser.Patient.MedicalFile ?? [],
              patientMedicalProfile: currentUser.Patient.PatientMedicalProfile ?? null,
              payment: currentUser.Patient.Payment ?? [],
            })
            get().setDoctorProfile(null)
          } else if (currentUser.role === 'DOCTOR' && currentUser.Doctor) {
            get().setDoctorProfile({
              id: currentUser.Doctor.id,
              accountId: currentUser.id,
              email: currentUser.email ?? '',
              phone: currentUser.phone ?? '',
              firstName: currentUser.Doctor.firstName ?? '',
              lastName: currentUser.Doctor.lastName ?? '',
              bio: currentUser.Doctor.bio ?? '',
              specialties: currentUser.Doctor.specialties?.map(ds => ({
                doctorId: ds.doctorId,
                specialtyId: ds.specialtyId,
                specialty: ds.Specialty ?? null,
              })) ?? [],
              appointment: currentUser.Doctor.Appointment ?? [],
              account: currentUser.Doctor.Account ?? null,
              specialty: currentUser.Doctor.Specialty ?? null,
              doctorAvailability: currentUser.Doctor.DoctorAvailability ?? [],
              doctorAvailableSlot: currentUser.Doctor.DoctorAvailableSlot ?? [],
            })
            get().setPatientProfile(null)
          } else {
            get().setPatientProfile(null);
            get().setDoctorProfile(null);
          }
        } else {
           get().clearUserProfile();
        }
        set({ isLoadingProfile: false });
      },
      clearUserProfile: () => set({patientProfile:null , doctorProfile:null, isLoadingProfile: false}),
    }),
    {
      name: "user-profile-storage",
       storage: createJSONStorage(() => localStorage),
    }
  )
)


export default userStore