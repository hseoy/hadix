import classnames from 'classnames';
import { CSSProperties } from 'react';

import styles from './Flex.module.scss';

export interface FlexProps {
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  className?: string;
  children?: React.ReactNode;
}

export const Flex = ({
  flexDirection,
  justifyContent,
  alignItems,
  className,
  children,
}: FlexProps) => {
  return (
    <div
      className={classnames(styles.flex, className)}
      style={{ flexDirection, justifyContent, alignItems }}
    >
      {children}
    </div>
  );
};
