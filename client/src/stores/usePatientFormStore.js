import { create } from 'zustand';

const usePatientFormStore = create((set) => ({
  patientForm: {
    height: '',
    weight: '',
    bloodType: '',
    congenital: '',
    allergies: '',
    surgeries: '',
    medications: '',
    symptoms: '',
    reason: '',
    address: '',
     birthDate: '',
      gender: '',
      nationalId: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelation: '',
  },
  setField: (field, value) =>
    set((state) => ({
      patientForm: {
        ...state.patientForm,
        [field]: value,
      },
    })),
  resetForm: () =>
    set({
      patientForm: {
        height: '',
        weight: '',
        bloodType: '',
        congenital: '',
        allergies: '',
        surgeries: '',
        medications: '',
        symptoms: '',
        reason: '',
      },
    }),
}));

export default usePatientFormStore;
