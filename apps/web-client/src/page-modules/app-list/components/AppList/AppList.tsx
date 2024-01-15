import dayjs from 'dayjs';

import { Flex } from '~/modules/common';

import { AppListItem } from '../AppListItem/AppListItem';
import styles from './AppList.module.scss';

export const AppList = () => {
  return (
    <Flex
      className={styles['app-list-container']}
      justifyContent="space-between"
    >
      <AppListItem
        id="1234"
        name="외부영업타겟관리도구"
        createdAt={dayjs().subtract(3, 'day').toString()}
        createdBy="김놀이터"
        mainOwnerId="1234"
        mainOwnerName="김놀이터"
        previewUrl="https://fakeimg.pl/1280x720"
      />
      <AppListItem
        id="1234"
        name="외부영업타겟관리도구"
        createdAt={dayjs().subtract(3, 'day').toString()}
        createdBy="김놀이터"
        mainOwnerId="1234"
        mainOwnerName="김놀이터"
        previewUrl="https://fakeimg.pl/1280x720"
      />
      <AppListItem
        id="1234"
        name="외부영업타겟관리도구"
        createdAt={dayjs().subtract(3, 'day').toString()}
        createdBy="김놀이터"
        mainOwnerId="1234"
        mainOwnerName="김놀이터"
        previewUrl="https://fakeimg.pl/1280x720"
      />
      <AppListItem
        id="1234"
        name="외부영업타겟관리도구"
        createdAt={dayjs().subtract(3, 'day').toString()}
        createdBy="김놀이터"
        mainOwnerId="1234"
        mainOwnerName="김놀이터"
        previewUrl="https://fakeimg.pl/1280x720"
      />
      <AppListItem
        id="1234"
        name="외부영업타겟관리도구"
        createdAt={dayjs().subtract(3, 'day').toString()}
        createdBy="김놀이터"
        mainOwnerId="1234"
        mainOwnerName="김놀이터"
        previewUrl="https://fakeimg.pl/1280x720"
      />
      <AppListItem
        id="1234"
        name="외부영업타겟관리도구"
        createdAt={dayjs().subtract(3, 'day').toString()}
        createdBy="김놀이터"
        mainOwnerId="1234"
        mainOwnerName="김놀이터"
        previewUrl="https://fakeimg.pl/1280x720"
      />
    </Flex>
  );
};
