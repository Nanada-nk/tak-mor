import { create } from 'zustand';

const useBookingStore = create((set) => ({
  specialty: '',
  service: '',
  appointmentType: '',
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
}));

export default useBookingStore;
