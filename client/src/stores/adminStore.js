// client/src/stores/adminStore.js

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axiosInstance from "../config/axios.js";

const defaultPagination = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
};

const adminStore = create(
  persist(
    (set, get) => {
      const fetchList = async (key, path, filters = {}, page = 1) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get(path, {
            params: { ...get().filters, ...filters, page, limit: get().pagination.itemsPerPage },
          });

          const newPagination = response.data.pagination || get().pagination;
          const fetchedData = response.data.data;

          // *** สำคัญ: ตรวจสอบและปรับ currentPage ถ้าเกิน totalPages (Best Practice) ***
          let finalPage = page;
          if (newPagination.totalItems > 0 && page > newPagination.totalPages) {
            finalPage = newPagination.totalPages; // ย้อนกลับไปหน้าสุดท้าย
            // ถ้าหน้าสุดท้ายเป็น 0 (ไม่มีข้อมูลเลย) ให้กลับไปหน้า 1
            if (finalPage === 0) finalPage = 1;
            console.warn(`Page ${page} is out of bounds. Adjusting to page ${finalPage}.`);
            // เรียก fetchList ซ้ำด้วยหน้าใหม่ที่ถูกต้อง (ถ้ามีการปรับหน้า)
            // การเรียกซ้ำตรงนี้อาจทำให้เกิด loop ถ้า Backend ไม่ส่ง totalPages ที่ถูกต้อง
            // หรือถ้ามีข้อมูลน้อยกว่า 1 หน้า
            // ทางเลือก: ให้ Frontend จัดการการกดปุ่ม pagination ไม่ให้เกิน totalPages
            // และ Backend ควร return totalPages = 1 ถ้า totalItems = 0
          }

          set({
            [key]: fetchedData,
            pagination: { ...newPagination, currentPage: finalPage }, // อัปเดต pagination ด้วย finalPage
            isLoading: false,
          });

          // ถ้ามีการปรับหน้าอัตโนมัติ ให้เรียก fetchList ซ้ำ (กรณีที่หน้าปัจจุบันเกินขอบเขต)
          if (finalPage !== page) {
            console.log(`Re-fetching ${key} for adjusted page ${finalPage}.`);
            get().setPagination({ currentPage: finalPage }); // อัปเดต pagination ใน store เพื่อ trigger useEffect ใน Component
            // ไม่ต้องเรียก fetchList ตรงๆ ที่นี่ เพราะ Component จะเรียกใหม่เมื่อ pagination.currentPage เปลี่ยน
          }


        } catch (error) {
          set({
            error: error?.response?.data?.message || error.message || `Failed to fetch ${key}.`,
            isLoading: false
          });
        }
      };

      return {
        // --- State ---
        patients: [],
        doctors: [],
        appointments: [],
        isLoading: false,
        error: null,
        filters: {},
        pagination: { ...defaultPagination },

        // --- Actions ---
        fetchPatients: (filters = {}, page = 1) => fetchList('patients', '/api/admin/patients', filters, page),
        fetchDoctors: (filters = {}, page = 1) => fetchList('doctors', '/api/admin/doctors', filters, page),
        fetchAppointments: (filters = {}, page = 1) => fetchList('appointments', '/api/admin/tele/appointments', filters, page),

        setFilters: (newFilters) =>
          set((state) => ({
            filters: { ...state.filters, ...newFilters },
            pagination: { ...state.pagination, currentPage: 1 } // Reset to page 1 when filters change
          })),

        setPagination: (newPagination) =>
          set((state) => ({
            pagination: { ...state.pagination, ...newPagination }
          })),

        clearData: () =>
          set({
            patients: [],
            doctors: [],
            appointments: [],
            isLoading: false,
            error: null,
            filters: {},
            pagination: { ...defaultPagination }
          }),
      };
    },
    {
      name: "admin-dashboard",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        filters: state.filters,
        pagination: state.pagination
      }),
    }
  )
);

export default adminStore;