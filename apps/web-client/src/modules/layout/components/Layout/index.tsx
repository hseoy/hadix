import { Stack } from '~/modules/common';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return <Stack>{children}</Stack>;
};
