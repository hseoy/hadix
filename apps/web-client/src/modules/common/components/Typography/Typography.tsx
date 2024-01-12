import classNames from 'classnames';
import React, { ReactHTML } from 'react';

import styles from './Typography.module.scss';

interface TypographyProps {
  /**
   * @default body1
   */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body1' | 'body2';
  /**
   * @default regular
   */
  weight?: 'regular' | 'medium' | 'bold';
  /**
   * @default span
   */
  as?: keyof ReactHTML;
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Typography = ({
  variant = 'body1',
  weight = 'regular',
  as: Component = 'span',
  color,
  className,
  children,
}: TypographyProps) => {
  return (
    <Component
      className={classNames(
        className,
        styles[`typography__weight--${weight}`],
        styles[`typography__variant--${variant}`],
      )}
      style={{ color }}
    >
      {children}
    </Component>
  );
};
