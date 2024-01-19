import { Flex, Typography } from '~/modules/common';
import { ThemeSwitch } from '~/modules/style-theme';

import styles from './AppHeader.module.scss';

export interface AppHeaderProps {
  appName?: React.ReactNode;
}

export const AppHeader = ({ appName }: AppHeaderProps) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      className={styles['app-header']}
    >
      <Typography variant="h5" weight="bold">
        {appName}
      </Typography>

      <ThemeSwitch />
    </Flex>
  );
};
