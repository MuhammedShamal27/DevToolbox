import { create } from 'zustand';

interface ToolStore {
  activeToolId: string | null;
  setActiveTool: (id: string | null) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useToolStore = create<ToolStore>((set) => ({
  activeToolId: null,
  setActiveTool: (id) => set({ activeToolId: id }),
  isDarkMode: true, // Default to dark mode for developer feel
  toggleDarkMode: () => set((state) => {
    const newDarkMode = !state.isDarkMode;
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { isDarkMode: newDarkMode };
  }),
}));
