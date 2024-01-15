import { useEffect } from 'react';

import { useStyleThemeStore } from '../stores/style-theme';

export const useStyleThemeEffect = () => {
  const theme = useStyleThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
};
