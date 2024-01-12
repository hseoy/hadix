import { Stack } from '~/modules/common';

import styles from './AppContent.module.scss';

export interface AppContentProps {
  children?: React.ReactNode;
}

export const AppContent = ({ children }: AppContentProps) => {
  return (
    <Stack className={styles['app-content']} fullHeight>
      {children}
    </Stack>
  );
};
