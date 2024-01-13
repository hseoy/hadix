import { ReactNode, useEffect } from 'react';
import { NavigateOptions, To, useNavigate } from 'react-router-dom';

import { Maybe } from '../Maybe/Maybe';

export interface RedirectProps {
  to?: To;
  children?: ReactNode;
  navigateOptions?: NavigateOptions;
}

/**
 * @description to가 존재하면 해당 경로로 이동한다.
 */
export const Redirect = ({ to, navigateOptions, children }: RedirectProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (to) {
      navigate(to, navigateOptions);
    }
  }, [to, navigateOptions]);

  return <Maybe test={!to}>{children}</Maybe>;
};
