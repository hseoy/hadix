import classnames from 'classnames';
import { CSSProperties } from 'react';

import styles from './Flex.module.scss';

export interface FlexProps {
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  gap?: CSSProperties['gap'];
  className?: string;
  children?: React.ReactNode;
  style?: CSSProperties;
  fullHeight?: boolean;
}

export const Flex = ({
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  className,
  children,
  style,
  fullHeight,
}: FlexProps) => {
  return (
    <div
      className={classnames(
        className,
        styles.flex,
        fullHeight && styles['flex--full-height']
      )}
      style={{ ...style, flexDirection, justifyContent, alignItems, gap }}
    >
      {children}
    </div>
  );
};
