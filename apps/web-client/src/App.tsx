import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './AppRoutes';
import { useStyleThemeEffect } from './modules/style-theme';

export const App = () => {
  useStyleThemeEffect();

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
