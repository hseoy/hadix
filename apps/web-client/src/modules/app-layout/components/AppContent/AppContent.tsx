import classNames from 'classnames';

import { Stack } from '~/modules/common';

import styles from './AppContent.module.scss';

export interface AppContentProps {
  children?: React.ReactNode;
  isWithAppSidebar?: boolean;
}

export const AppContent = ({ children, isWithAppSidebar }: AppContentProps) => {
  return (
    <Stack
      className={classNames(
        isWithAppSidebar && styles['app-content--with-app-sidebar'],
      )}
      fullHeight
    >
      {children}
    </Stack>
  );
};
