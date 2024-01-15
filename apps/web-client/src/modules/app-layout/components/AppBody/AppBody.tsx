import { Stack } from '~/modules/common';

import styles from './AppBody.module.scss';

export interface AppBodyProps {
  children: React.ReactNode;
}

export const AppBody = ({ children }: AppBodyProps) => {
  return (
    <Stack fullHeight className={styles['app-body']}>
      {children}
    </Stack>
  );
};
