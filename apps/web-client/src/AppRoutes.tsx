import { Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { AppLayout } from './modules/app-layout';
import { Redirect } from './modules/common';
import { WorkSpaceList } from './pages/workspace/WorkspaceList/WorkspaceList';

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

            <Route path="/workspaces" element={<WorkSpaceList />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
