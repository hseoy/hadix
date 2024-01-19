import { Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { AppLayout, AppLogo } from './modules/app-layout';
import { Redirect } from './modules/common';
import { AppListPage } from './page-modules/app-list';

export const AppRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route>
          <Route
            path="/"
            element={
              <AppLayout appName={<AppLogo />}>
                <Outlet />
              </AppLayout>
            }
          >
            <Route
              path="/"
              element={
                <Redirect to="/apps" navigateOptions={{ replace: true }} />
              }
            />

            <Route path="/apps" element={<AppListPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
