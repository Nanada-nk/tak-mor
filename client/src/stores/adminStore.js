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

          let finalPage = page;
          if (newPagination.totalItems > 0 && page > newPagination.totalPages) {
            finalPage = newPagination.totalPages; 
            if (finalPage === 0) finalPage = 1;
            console.warn(`Page ${page} is out of bounds. Adjusting to page ${finalPage}.`);
          }

          set({
            [key]: fetchedData,
            pagination: { ...newPagination, currentPage: finalPage }, 
            isLoading: false,
          });

         
          if (finalPage !== page) {
            console.log(`Re-fetching ${key} for adjusted page ${finalPage}.`);
            get().setPagination({ currentPage: finalPage }); 
          }


        } catch (error) {
          set({
            error: error?.response?.data?.message || error.message || `Failed to fetch ${key}.`,
            isLoading: false
          });
        }
      };

      return {
        patients: [],
        doctors: [],
        appointments: [],
        isLoading: false,
        error: null,
        filters: {},
        pagination: { ...defaultPagination },


        fetchPatients: (filters = {}, page = 1) => fetchList('patients', '/api/admin/patients', filters, page),
        fetchDoctors: (filters = {}, page = 1) => fetchList('doctors', '/api/admin/doctors', filters, page),
        fetchAppointments: (filters = {}, page = 1) => fetchList('appointments', '/api/admin/tele/appointments', filters, page),

        setFilters: (newFilters) =>
          set((state) => ({
            filters: { ...state.filters, ...newFilters },
            pagination: { ...state.pagination, currentPage: 1 } 
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