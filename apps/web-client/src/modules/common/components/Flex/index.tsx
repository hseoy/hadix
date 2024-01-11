import { Styled, StyledProps } from '../Styled';

export type FlexProps = Omit<StyledProps, 'display'>;

export const Flex = (props: FlexProps) => {
  return <Styled {...props} _display="flex" />;
};
