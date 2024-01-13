import { Layout } from '~/modules/layout';

import { AppBody } from '../AppBody/AppBody';
import { AppHeader, AppHeaderProps } from '../AppHeader/AppHeader';

export interface AppLayoutProps {
  children: React.ReactNode;
  appName?: AppHeaderProps['appName'];
}

export const AppLayout = ({ appName, children }: AppLayoutProps) => {
  return (
    <Layout fullHeight>
      <AppHeader appName={appName} />
      <AppBody>{children}</AppBody>
    </Layout>
  );
};
