import { create } from 'zustand';

export type StyleTheme = 'dark' | 'light';
export interface StyleThemeStore {
  theme: StyleTheme;
  setTheme: (theme: StyleTheme) => void;
}

export const useStyleThemeStore = create<StyleThemeStore>((set) => ({
  theme: window?.matchMedia('(prefers-color-scheme: dark)')?.matches
    ? 'dark'
    : 'light',
  setTheme: (theme) => set({ theme }),
}));
