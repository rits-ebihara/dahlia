import { useMemo } from 'react';

export const generateUseStyles =
  <T, U>(fn: (p: T) => U) =>
  (p: T) => {
    const classNames = useMemo(() => fn(p), [p]);
    return classNames;
  };
