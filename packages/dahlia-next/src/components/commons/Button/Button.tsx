import classNames from 'classnames';
import React from 'react';

type Props = JSX.IntrinsicElements['button'];

export const Button: React.FC<Props> = props => {
  const { children, className, type, ...rest } = props;
  const _type = type || 'button';
  const _className = classNames('dahlia-btn', 'btn', className);
  return (
    <button
      type={_type}
      className={_className}
      {...rest}
      data-testid="container"
    >
      {children}
    </button>
  );
};
