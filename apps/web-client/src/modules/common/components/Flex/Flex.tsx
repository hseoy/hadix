import classnames from 'classnames';
import { CSSProperties } from 'react';

import styles from './Flex.module.scss';

export interface FlexProps {
  flexDirection?: CSSProperties['flexDirection'];
  className?: string;
  children?: React.ReactNode;
}

export const Flex = ({ flexDirection, className, children }: FlexProps) => {
  return (
    <div
      className={classnames(styles.flex, className)}
      style={{ flexDirection }}
    >
      {children}
    </div>
  );
};
