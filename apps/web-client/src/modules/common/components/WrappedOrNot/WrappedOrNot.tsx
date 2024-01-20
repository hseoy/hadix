import { PropsWithChildren } from 'react';

interface WrappedOrNotProps<P extends PropsWithChildren> {
  renderWrapper?: (props: P) => React.ReactNode;
  wrapperProps?: P;
  isWrapped: boolean;
  children?: React.ReactNode;
}

export const WrappedOrNot = <P extends PropsWithChildren>({
  renderWrapper,
  wrapperProps,
  isWrapped,
  children,
}: WrappedOrNotProps<P>) => {
  const wrappedOrNot =
    renderWrapper && wrapperProps && isWrapped
      ? renderWrapper({ ...wrapperProps, children })
      : children;

  return wrappedOrNot;
};
