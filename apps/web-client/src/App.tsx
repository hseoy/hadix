import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GlobalHeader } from './modules/layouts/components/GlobalHeader';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GlobalHeader />} />
      </Routes>
    </BrowserRouter>
  );
};
