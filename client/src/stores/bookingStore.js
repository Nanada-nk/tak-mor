import { create } from 'zustand';

const useBookingStore = create((set) => ({
  specialty: '',
  service: '',
  appointmentType: '',
  hospital: '',
  dateTime: null,
  servicePrice: 0,
  setSpecialty: (specialty) => set({ specialty }),
  setService: (service) => set({ service }),
  setAppointmentType: (appointmentType) => set({ appointmentType }),
  setHospital: (hospital) => set({ hospital }),
  setDateTime: (dateTime) => set({ dateTime }),
  resetBooking: () => set({ specialty: '', service: '', appointmentType: '', hospital: '', dateTime: null }),
  setServicePrice: (price) => set({ servicePrice: price }),
}));

export default useBookingStore;
