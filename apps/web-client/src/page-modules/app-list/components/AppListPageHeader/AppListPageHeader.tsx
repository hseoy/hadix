import { Typography } from '~/modules/common';

import styles from './AppListPageHeader.module.scss';

export const AppListPageHeader = () => {
  return (
    <Typography
      variant="h3"
      weight="bold"
      className={styles['app-list-page-header']}
    >
      놀이터 앱 목록
    </Typography>
  );
};
