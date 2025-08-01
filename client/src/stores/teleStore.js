import { create } from "zustand";

// Enum สำหรับ call status (optional)
export const CALL_STATUS = {
  IDLE: 'idle',                   // ไม่มีการโทร
  LOADING_APPOINTMENT: 'LOADING_APPOINTMENT', // กำลังโหลดข้อมูลการนัดหมาย
  APPOINTMENT_ERROR: 'APPOINTMENT_ERROR',     // เกิดข้อผิดพลาดในการโหลดข้อมูลการนัดหมาย
  CONNECTING: 'connecting',       // กำลังพยายามเชื่อมต่อ
  RINGING: 'ringing',             // กำลังโทรออก/มีสายเรียกเข้า
  INCALL: 'in-call',              // อยู่ในสาย
  DISCONNECTED: 'disconnected',   // สายถูกตัด/จบลง
  ERROR: 'error',                 // เกิดข้อผิดพลาดในการโทร
  LOADING_APPOINTMENT: 'loading-appointment', // กำลังโหลดข้อมูลการนัดหมาย
  APPOINTMENT_ERROR: 'appointment-error',     // เกิดข้อผิดพลาดในการโหลดข้อมูลการนัดหมาย
};

const getDefaultState = () => ({
  callStatus: CALL_STATUS.IDLE,
  chatMessages: [],
  participants: [],
  currentRoomId: null,
  isMicMuted: false,
  isCameraOff: false,
  socketConnected: false,
  error: null,
});

const teleStore = create((set, get) => ({
  ...getDefaultState(),

  setCallStatus: (status) => set({ callStatus: status }),

  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
    })),

  setChatMessages: (messages) => set({ chatMessages: messages }),

  setParticipants: (participants) => set({ participants }),

  setCurrentRoomId: (roomId) => set({ currentRoomId: roomId }),

  setMicMuted: (isMuted) => set({ isMicMuted: isMuted }),

  setCameraOff: (isOff) => set({ isCameraOff: isOff }),

  setSocketConnected: (connected) => set({ socketConnected: connected }),

  toggleMic: () => set((state) => ({ isMicMuted: !state.isMicMuted })),

  toggleCamera: () => set((state) => ({ isCameraOff: !state.isCameraOff })),

  setError: (errorMessage) => set({ error: errorMessage }),

  clearTeleState: () => set(getDefaultState()),
}));

export default teleStore;
