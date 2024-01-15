import classNames from 'classnames';
import dayjs from 'dayjs';

import { Maybe } from '../Maybe/Maybe';
import { Stack } from '../Stack';
import { Typography } from '../Typography/Typography';
import styles from './ItemCard.module.scss';

export interface ItemCardProps {
  thumbnail?: string;
  thumbnailSize?: { width: number; height: number };
  title?: string;
  author?: string;
  createdAt?: string;
  modifiedAt?: string;
  className?: string;
  renderHover?: () => React.ReactNode;
}

export const ItemCard = ({
  thumbnail,
  thumbnailSize,
  title,
  author,
  createdAt,
  modifiedAt,
  className,
  renderHover,
}: ItemCardProps) => {
  const createdOrModifiedAt = modifiedAt ?? createdAt;
  const suffixCreatedOrModifiedAt = modifiedAt ? '수정' : '생성';

  return (
    <Stack gap="20px" className={classNames(styles['item-card'], className)}>
      <div className={styles['item-card__thumbnail-container']}>
        <div style={{ ...thumbnailSize }}>
          <img
            src={thumbnail}
            className={styles['item-card__thumbnail-img']}
            alt=""
          />
        </div>

        <Maybe test={!!renderHover}>
          <div className={styles['item-card__hover-section']}>
            {renderHover?.()}
          </div>
        </Maybe>
      </div>

      <Stack gap="4px">
        <Maybe test={!!title}>
          <Typography weight="bold" className={styles['item-card__title']}>
            {title}
          </Typography>
        </Maybe>

        <Maybe test={!!author}>
          <Typography variant="body1" className={styles['item-card__author']}>
            {author}
          </Typography>
        </Maybe>

        <Maybe test={!!createdOrModifiedAt}>
          <Typography
            variant="body2"
            className={styles['item-card__created-or-modified-at']}
          >
            {`${dayjs().to(
              dayjs(createdOrModifiedAt)
            )} ${suffixCreatedOrModifiedAt}`}
          </Typography>
        </Maybe>
      </Stack>
    </Stack>
  );
};
