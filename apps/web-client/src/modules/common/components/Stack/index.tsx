import { Flex, FlexProps } from '../Flex/Flex';

export type StackProps = Omit<FlexProps, 'flexDirection'>;

export const Stack = (props: StackProps) => {
  return <Flex {...props} flexDirection="column" />;
};
