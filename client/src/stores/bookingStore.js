import { create } from 'zustand';

const useBookingStore = create((set) => ({
  specialty: '',
  service: '',
  appointmentType: '',
<<<<<<< HEAD
  clinic: '',
  selectedDate: null,
  selectedTime: '',
  setSpecialty: (specialty) => set({ specialty }),
  setService: (service) => set({ service }),
  setAppointmentType: (appointmentType) => set({ appointmentType }),
  setClinic: (clinic) => set({ clinic }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setSelectedTime: (selectedTime) => set({ selectedTime }),
  resetBooking: () =>
    set({
      specialty: '',
      service: '',
      appointmentType: '',
      clinic: '',
      selectedDate: null,
      selectedTime: '',
    }),
=======
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
>>>>>>> 9621cad854d10b07302b227b7ad67c9a8e29a745
}));

export default useBookingStore;
