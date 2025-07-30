import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useBookingStore = create(
  persist(
    (set) => ({
      specialty: '',
      service: '',
      appointmentType: '',
      hospital: '',
      dateTime: null,
      servicePrice: 0,
      clinic: '',
      selectedDate: null,
      selectedTime: '',
      doctorId: null,
      startDateTime: null,
  endDateTime: null,
  setStartDateTime: (dt) => set({ startDateTime: dt }),
  setEndDateTime: (dt) => set({ endDateTime: dt }),
      setSpecialty: (specialty) => set({ specialty }),
      setService: (service) => set({ service }),
      setAppointmentType: (appointmentType) => set({ appointmentType }),
      setHospital: (hospital) => set({ hospital }),
      setDateTime: (dateTime) => set({ dateTime }),
      setSelectedDate: (selectedDate) => set({ selectedDate }),
      setSelectedTime: (selectedTime) => set({ selectedTime }),
      setServicePrice: (price) => set({ servicePrice: price }),
      setDoctorId: (doctorId) => set({ doctorId }),
      resetBooking: () =>
        set({
          specialty: '',
          service: '',
          appointmentType: '',
          hospital: '',
          dateTime: null,
          doctorId: null,
          selectedDate: null,
          selectedTime: '',
          servicePrice: 0,
          clinic: '',
        }),
    }),
    
    {
      name: 'BookingStore', // unique name
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBookingStore;
