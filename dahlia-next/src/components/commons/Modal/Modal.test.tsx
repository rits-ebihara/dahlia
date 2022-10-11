/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { fireEvent, render as _render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { Modal } from './Modal';

const render = (props: ComponentProps<typeof Modal>) => {
  return _render(
    <div>
      <Modal {...props} />
      <div id="modal-root"></div>
    </div>,
  );
};

test('renders Modal', () => {
  render({
    open: true,
    children: <div data-testid="content">ダイアログの内容</div>,
    onClose: jest.fn(),
  });
  expect(screen.getByTestId('modal-root')).toBeInTheDocument();
  const toggleCheckbox = screen.getByTestId('toggle-checkbox');
  expect(toggleCheckbox).toBeChecked();
  const content = screen.getByTestId('content');
  expect(content).toHaveTextContent('ダイアログの内容');
});

test('events Modal', () => {
  const onClose = jest.fn();
  render({
    open: true,
    children: <div data-testid="content">ダイアログの内容</div>,
    onClose,
  });
  const root = screen.getByTestId('modal-root');
  fireEvent.click(root);
  expect(onClose).toBeCalled();
});
