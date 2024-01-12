interface MaybeProps {
  test?: boolean;
  children?: React.ReactNode;
}

export const Maybe = ({ test, children }: MaybeProps) => {
  return test ? children : null;
};
