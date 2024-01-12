import { Maybe } from '~/modules/common';
import { Layout } from '~/modules/layout';

import { AppBody } from '../AppBody/AppBody';
import { AppContent } from '../AppContent/AppContent';
import { AppHeader, AppHeaderProps } from '../AppHeader/AppHeader';
import { AppSidebar } from '../AppSidebar/AppSidebar';

export interface AppLayoutProps {
  children: React.ReactNode;
  appName?: AppHeaderProps['appName'];
  hideSidebar?: boolean;
}

export const AppLayout = ({
  appName,
  children,
  hideSidebar,
}: AppLayoutProps) => {
  return (
    <Layout fullHeight>
      <AppHeader appName={appName} />
      <AppBody>
        <Maybe test={!hideSidebar}>
          <AppSidebar />
        </Maybe>
        <AppContent>{children}</AppContent>
      </AppBody>
    </Layout>
  );
};
