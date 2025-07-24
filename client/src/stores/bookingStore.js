import { create } from 'zustand';

const useBookingStore = create((set) => ({
  specialty: '',
  service: '',
  appointmentType: '',
  clinic: '',
  dateTime: null,
  setSpecialty: (specialty) => set({ specialty }),
  setService: (service) => set({ service }),
  setAppointmentType: (appointmentType) => set({ appointmentType }),
  setClinic: (clinic) => set({ clinic }),
  setDateTime: (dateTime) => set({ dateTime }),
  resetBooking: () => set({ specialty: '', service: '', appointmentType: '', clinic: '', dateTime: null }),
}));

export default useBookingStore;
