import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './AppRoutes';

export const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
