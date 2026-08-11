import { create } from 'zustand';

interface UiState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));
