import classNames from 'classnames';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { generateUseStyles } from '~/reactUtils';

const useStyles = generateUseStyles(() => ({
  root: classNames('modal', 'cursor-pointer'),
  contents: classNames('modal-box'),
}));

type Props = {
  open: boolean;
  onClose: () => void;
} & PropsWithChildren;

export const Modal: React.FC<Props> = props => {
  const { open, onClose } = props;
  const styles = useStyles({});

  // NextJSで、サーバーサイドレンダリングを行えないので、ククライアントサイド行う
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setRendered(true);
  }, []);

  if (!rendered) return null;
  return createPortal(
    <>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={open}
        readOnly
        data-testid="toggle-checkbox"
      />
      <div className={styles.root} onClick={onClose} data-testid="modal-root">
        <div className={styles.contents}>{props.children}</div>
      </div>
    </>,
    document.getElementById('modal-root') as HTMLElement,
  );
};
