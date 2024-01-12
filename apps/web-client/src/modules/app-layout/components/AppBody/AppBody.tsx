import { Stack } from '~/modules/common';

export interface AppBodyProps {
  children: React.ReactNode;
}

export const AppBody = ({ children }: AppBodyProps) => {
  return <Stack fullHeight>{children}</Stack>;
};
