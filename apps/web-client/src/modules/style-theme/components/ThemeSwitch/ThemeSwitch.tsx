import { DarkModeSwitch } from 'react-toggle-dark-mode';

import { useStyleThemeStore } from '../../stores/style-theme';

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useStyleThemeStore();

  return (
    <DarkModeSwitch
      checked={theme === 'dark'}
      onChange={toggleTheme}
      size={25}
      moonColor="white"
      sunColor="white"
    />
  );
};
