import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useCallback, useState } from 'react';
import { Modal } from './Modal';

export default {
  title: 'commons/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = args => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { open: _open, onClose: _onClose, ...rest } = args;
  const [open, setOpen] = useState(_open);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <div>
      <button className="btn" onClick={onOpen}>
        Open Modal
      </button>
      <Modal open={open} onClose={onClose} {...rest} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  children: <div>ダイアログの内容</div>,
};

export const WithActions = () => {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onCommit = useCallback(() => {
    window.alert('commit');
    onClose();
  }, [onClose]);

  return (
    <div>
      <button className="btn" onClick={onOpen}>
        Open Modal
      </button>
      <Modal open={open} onClose={onClose}>
        <div>
          <h3 className="text-xl font-bold">タイトル</h3>
          <p>内容・・・・・・・・・・・・・・・・・・・・・・・</p>
        </div>
        <div className="modal-action">
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={onClose}
          >
            キャンセル
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={onCommit}
          >
            確定
          </button>
        </div>
      </Modal>
    </div>
  );
};
