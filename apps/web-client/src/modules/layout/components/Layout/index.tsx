import { Stack, StackProps } from '~/modules/common';

export type LayoutProps = StackProps;

export const Layout = (props: LayoutProps) => {
  return <Stack {...props} />;
};
