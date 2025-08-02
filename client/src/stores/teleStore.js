import { create } from "zustand";

// Enum สำหรับ call status (optional)
export const CALL_STATUS = {
  IDLE: 'idle',
  LOADING_APPOINTMENT: 'loading-appointment',
  APPOINTMENT_ERROR: 'appointment-error',
  CONNECTING: 'connecting',
  RINGING: 'ringing',
  INCALL: 'in-call',
  DISCONNECTED: 'disconnected',
  ERROR: 'error',
};

const getDefaultState = () => ({
  callStatus: CALL_STATUS.IDLE,
  chatMessages: [],
  // participants: [],
  currentRoomId: null,
  isMicMuted: false,
  isCameraOff: false,
  // socketConnected: false,
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

  // setParticipants: (participants) => set({
  //   participants: Array.isArray(participants) ? participants : []
  // }),

  setCurrentRoomId: (roomId) => set({ currentRoomId: roomId }),

  setMicMuted: (isMuted) => set({ isMicMuted: isMuted }),

  setCameraOff: (isOff) => set({ isCameraOff: isOff }),

  // setSocketConnected: (connected) => set({ socketConnected: connected }),

  toggleMic: () => set((state) => ({ isMicMuted: !state.isMicMuted })),

  toggleCamera: () => set((state) => ({ isCameraOff: !state.isCameraOff })),

  setError: (errorMessage) => set({ error: errorMessage }),

  clearTeleState: () => set(getDefaultState()),
}));

export default teleStore;
