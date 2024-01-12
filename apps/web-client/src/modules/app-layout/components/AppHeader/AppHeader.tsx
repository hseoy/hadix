import { Flex, Typography } from '~/modules/common';

import styles from './AppHeader.module.scss';

export interface AppHeaderProps {
  appName?: string;
}

export const AppHeader = ({ appName }: AppHeaderProps) => {
  return (
    <Flex alignItems="center" className={styles['app-header']}>
      <Typography variant="h5" weight="bold">
        {appName}
      </Typography>
    </Flex>
  );
};
