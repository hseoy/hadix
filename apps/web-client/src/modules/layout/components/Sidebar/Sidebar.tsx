import classNames from 'classnames';
import { CSSProperties } from 'react';

import { Stack } from '~/modules/common';

import styles from './Sidebar.module.scss';

export interface SidebarProps {
  /**
   * @default left
   */
  position?: 'left' | 'right';
  /**
   * @default 300
   */
  width?: CSSProperties['width'];
  /**
   * @default 100%
   */
  height?: CSSProperties['height'];
  children: React.ReactNode;
  style?: CSSProperties;
}

export const Sidebar = ({
  position = 'left',
  height = '100%',
  width = 300,
  children,
  style,
}: SidebarProps) => {
  return (
    <Stack
      className={classNames(
        styles.sidebar,
        styles[`sidebar__position--${position}`],
      )}
      style={{ ...style, width, height }}
    >
      {children}
    </Stack>
  );
};
