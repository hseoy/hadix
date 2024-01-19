import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type StyleTheme = 'dark' | 'light';
export interface StyleThemeStore {
  theme: StyleTheme;
  setTheme: (theme: StyleTheme) => void;
  toggleTheme: () => void;
}

export const useStyleThemeStore = create(
  persist<StyleThemeStore>(
    (set) => ({
      theme: window?.matchMedia('(prefers-color-scheme: dark)')?.matches
        ? 'dark'
        : 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((prev) => ({
          ...prev,
          theme: prev.theme === 'dark' ? 'light' : 'dark',
        })),
    }),
    { name: 'style-theme' }
  )
);
