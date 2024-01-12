import { Layout } from '~/modules/layout';

import { AppBody } from '../AppBody/AppBody';
import { AppContent } from '../AppContent/AppContent';
import { AppHeader, AppHeaderProps } from '../AppHeader/AppHeader';
import { AppSidebar } from '../AppSidebar/AppSidebar';

export interface AppLayoutProps {
  children: React.ReactNode;
  appName?: AppHeaderProps['appName'];
}

export const AppLayout = ({ appName, children }: AppLayoutProps) => {
  return (
    <Layout fullHeight>
      <AppHeader appName={appName} />
      <AppBody>
        <AppSidebar />
        <AppContent>{children}</AppContent>
      </AppBody>
    </Layout>
  );
};
