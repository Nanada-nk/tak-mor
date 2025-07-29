import { create } from 'zustand';

const useBookingStore = create((set) => ({
  specialty: '',
  service: '',
  appointmentType: '',
   hospital: '',
  dateTime: null,
  servicePrice: 0,
  clinic: '',
  selectedDate: null,
  selectedTime: '',
  setSpecialty: (specialty) => set({ specialty }),
  setService: (service) => set({ service }),
  setAppointmentType: (appointmentType) => set({ appointmentType }),
  // setClinic: (clinic) => set({ clinic }),
  setHospital: (hospital) => set({ hospital }),
  setDateTime: (dateTime) => set({ dateTime }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setSelectedTime: (selectedTime) => set({ selectedTime }),
  setServicePrice: (price) => set({ servicePrice: price }),
  // resetBooking: () =>
  //   set({
  //     specialty: '',
  //     service: '',
  //     appointmentType: '',
  //     clinic: '',
  //     selectedDate: null,
  //     selectedTime: '',
  //   }),
  resetBooking: () => set({ specialty: '', service: '', appointmentType: '', hospital: '', dateTime: null })
}));

export default useBookingStore;
