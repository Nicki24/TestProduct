import { create } from 'zustand';

export const useToastStore = create((set) => ({
    successMessage: null,
    setSuccessMessage: (message) => set({ successMessage: message }),
    clearSuccessMessage: () => set({ successMessage: null }),
}));