import { Flex, FlexProps } from '../Flex';

export type StackProps = Omit<FlexProps, 'flexDirection'>;

export const Stack = (props: StackProps) => {
  return <Flex {...props} _flexDirection="column" />;
};
