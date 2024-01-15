import { ReactNode } from 'react';

import { Stack } from '~/modules/common';

import styles from './AppListPageBody.module.scss';

export interface AppListPageBodyProps {
  children?: ReactNode;
}

export const AppListPageBody = ({ children }: AppListPageBodyProps) => {
  return (
    <Stack fullHeight className={styles['app-list-page-body']}>
      {children}
    </Stack>
  );
};
