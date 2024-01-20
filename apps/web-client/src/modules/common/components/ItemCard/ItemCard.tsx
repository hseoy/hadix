import classNames from 'classnames';
import dayjs from 'dayjs';
import { Link, LinkProps } from 'react-router-dom';

import { Maybe } from '../Maybe/Maybe';
import { Stack } from '../Stack';
import { Typography } from '../Typography/Typography';
import { WrappedOrNot } from '../WrappedOrNot/WrappedOrNot';
import styles from './ItemCard.module.scss';

export interface ItemCardProps {
  thumbnail?: string;
  thumbnailSize?: { width: number; height: number };
  title?: string;
  author?: string;
  createdAt?: string;
  modifiedAt?: string;
  lastModifiedBy?: string;
  createdBy?: string;
  className?: string;
  renderHover?: () => React.ReactNode;
  link?: LinkProps;
}

export const ItemCard = ({
  thumbnail,
  thumbnailSize,
  title,
  author,
  createdAt,
  modifiedAt,
  lastModifiedBy,
  createdBy,
  className,
  renderHover,
  link,
}: ItemCardProps) => {
  const createdOrModifiedAt = modifiedAt ?? createdAt;
  const suffixCreatedOrModifiedAt = modifiedAt ? '수정' : '생성';
  const additionalCreatedOrModifiedAt = (() => {
    if (modifiedAt && lastModifiedBy) return lastModifiedBy;
    if (createdAt && createdBy) return createdBy;
    return null;
  })();

  return (
    <Stack gap="20px" className={classNames(styles['item-card'], className)}>
      <div
        className={styles['item-card__thumbnail-container']}
        style={{ ...thumbnailSize }}
      >
        <img
          src={thumbnail}
          className={styles['item-card__thumbnail-img']}
          alt=""
        />

        <Maybe test={!!renderHover}>
          <div className={styles['item-card__hover-section']}>
            <WrappedOrNot
              renderWrapper={(linkProps) => <Link {...linkProps} />}
              wrapperProps={
                link
                  ? {
                      ...link,
                      className: styles['item-card__hover-section-link'],
                    }
                  : undefined
              }
              isWrapped={!!link}
            >
              {renderHover?.()}
            </WrappedOrNot>
          </div>
        </Maybe>
      </div>

      <Stack gap="4px">
        <Maybe test={!!title}>
          <div>
            <WrappedOrNot
              renderWrapper={(linkProps) => <Link {...linkProps} />}
              wrapperProps={
                link
                  ? {
                      ...link,
                      className: styles['item-card__title-link'],
                    }
                  : undefined
              }
              isWrapped={!!link}
            >
              <Typography weight="bold" className={styles['item-card__title']}>
                {title}
              </Typography>
            </WrappedOrNot>
          </div>
        </Maybe>

        <Maybe test={!!author}>
          <Typography variant="body2" className={styles['item-card__author']}>
            {author}
          </Typography>
        </Maybe>

        <Maybe test={!!createdOrModifiedAt}>
          <Typography
            variant="body2"
            className={styles['item-card__created-or-modified-at']}
          >
            {/* ex - N일 전 생성(생성자) or N일 전 수정(수정자) */}
            {`${dayjs().to(
              dayjs(createdOrModifiedAt)
            )} ${suffixCreatedOrModifiedAt}${
              additionalCreatedOrModifiedAt
                ? `(${additionalCreatedOrModifiedAt})`
                : ''
            }`}
          </Typography>
        </Maybe>
      </Stack>
    </Stack>
  );
};
