import { Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { AppLayout } from './modules/app-layout';
import { Redirect } from './modules/common';
import { WorkSpaceListPage } from './page-modules/workspace-list';

export const AppRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route>
          <Route
            path="/"
            element={
              <AppLayout appName="Playground">
                <Outlet />
              </AppLayout>
            }
          >
            <Route
              path="/"
              element={
                <Redirect
                  to="/workspaces"
                  navigateOptions={{ replace: true }}
                />
              }
            />

            <Route path="/workspaces" element={<WorkSpaceListPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
