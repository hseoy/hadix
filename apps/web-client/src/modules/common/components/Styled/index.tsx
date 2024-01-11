import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';

import { camelToKebab } from '../../utils/convert-case';

type CSSPropertyNames = keyof React.CSSProperties;
type StyleCustomAttributes = Partial<
  Record<`_${CSSPropertyNames}`, React.CSSProperties[CSSPropertyNames]>
>;

const StyledContainer = styled.div<StyleCustomAttributes>`
  ${({ children: _children, ...props }) =>
    Object.entries(props)
      .filter(([key]) => key.startsWith('_'))
      .map(([key, value]) => {
        return css`
          ${camelToKebab(key.replace('_', ''))}: ${value};
        `;
      })};
`;

export type AttributesWithCSSProperties<ElementT extends HTMLElement> =
  StyleCustomAttributes & HTMLAttributes<ElementT>;

export interface StyledProps<ElementT extends HTMLElement = HTMLDivElement>
  extends AttributesWithCSSProperties<ElementT> {
  /**
   * @default div
   */
  as?: keyof JSX.IntrinsicElements;
}

export const Styled = <ElementT extends HTMLElement = HTMLDivElement>({
  as = 'div',
  ...props
}: StyledProps<ElementT>) => {
  const StyledElement = StyledContainer.withComponent(as);

  return <StyledElement {...props} />;
};
