import { RiArrowRightDoubleLine } from '@remixicon/react';

import { Flex, Maybe, Stack, Typography } from '~/modules/common';
import { ItemCard } from '~/modules/common/components/ItemCard/ItemCard';

import styles from './AppLIstItem.module.scss';

export interface AppListItemProps {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt?: string;
  lastModifiedBy?: string;
  mainOwnerName: string;
  previewUrl?: string;
  deploymentStatus?: 'DEPLOYED' | 'DEPLOYING' | 'FAILED' | 'UNDEPLOYED';
  resolution?: { width: number; height: number };
  deviceType?: 'DESKTOP';
}

export const AppListItem = ({
  id,
  name,
  createdAt,
  lastModifiedAt,
  createdBy,
  lastModifiedBy,
  mainOwnerName,
  previewUrl,
  deploymentStatus,
  resolution,
  deviceType,
}: AppListItemProps) => {
  const thumbnailSizeByDeviceType = {
    DESKTOP: { width: 320, height: 180 },
  };
  const deploymentStatusLabelMap = {
    DEPLOYED: '배포됨',
    DEPLOYING: '배포중',
    FAILED: '배포실패',
    UNDEPLOYED: '배포안됨',
  };
  const thumbnailSize = thumbnailSizeByDeviceType[deviceType ?? 'DESKTOP'];
  const deploymentStatusLabel =
    deploymentStatusLabelMap[deploymentStatus ?? 'UNDEPLOYED'];

  return (
    <ItemCard
      className={styles['app-list-item']}
      title={name}
      author={mainOwnerName}
      createdAt={createdAt}
      createdBy={createdBy}
      modifiedAt={lastModifiedAt}
      lastModifiedBy={lastModifiedBy}
      thumbnail={previewUrl}
      thumbnailSize={thumbnailSize}
      link={{ to: `/apps/${id}` }}
      renderHover={() => (
        <Stack className={styles['hover-section']}>
          <Maybe test={!!resolution}>
            <Flex className={styles['hover-section__meta']}>
              <Typography variant="body2">{`${resolution?.width} x ${resolution?.height}`}</Typography>
              <Typography variant="body2">{deploymentStatusLabel}</Typography>
            </Flex>
          </Maybe>

          <Flex className={styles['hover-section__footer']}>
            <Stack>
              <Typography
                variant="body1"
                className={styles['hover-section__move-text']}
              >
                놀이터 앱으로 이동
              </Typography>
              <Typography
                variant="body2"
                className={styles['hover-section__app-id']}
              >
                앱 id: {id}
              </Typography>
            </Stack>
            <RiArrowRightDoubleLine
              className={styles['hover-section__arrow']}
            />
          </Flex>
        </Stack>
      )}
    />
  );
};
