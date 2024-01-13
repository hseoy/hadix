import { ReactNode } from 'react';

import { Stack } from '~/modules/common';

import styles from './AppListPageContainer.module.scss';

export interface AppListPageContainerProps {
  children?: ReactNode;
}

export const AppListPageContainer = ({
  children,
}: AppListPageContainerProps) => {
  return (
    <Stack className={styles['page-container']} fullHeight>
      {children}
    </Stack>
  );
};
