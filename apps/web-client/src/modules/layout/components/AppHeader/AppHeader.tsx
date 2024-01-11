import { Flex } from '~/modules/common';

import styles from './AppHeader.module.scss';

export interface AppHeaderProps {
  appName: string;
}

export const AppHeader = ({ appName }: AppHeaderProps) => {
  return <Flex className={styles['app-header']}>{appName}</Flex>;
};
