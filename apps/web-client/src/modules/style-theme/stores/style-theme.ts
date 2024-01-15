import { create } from 'zustand';

export type StyleTheme = 'dark' | 'light';
export interface ThemeStore {
  theme: StyleTheme;
  setTheme: (theme: StyleTheme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: window?.matchMedia('(prefers-color-scheme: dark)')?.matches
    ? 'dark'
    : 'light',
  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },
}));
