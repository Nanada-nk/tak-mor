// stores/patientFormStore.js
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
