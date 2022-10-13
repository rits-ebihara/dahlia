/**
 * @jest-environment jest-environment-jsdom
 */
import '@testing-library/jest-dom';
import {
  fireEvent,
  render as _render,
  screen,
  waitFor,
} from '@testing-library/react';
import React, { ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TextBox, TextBoxHF } from './TextBox';
import { zodResolver } from '@hookform/resolvers/zod';

const render = (props: ComponentProps<typeof TextBox>) => {
  return _render(<TextBox {...props} />);
};

test('renders TextBox', () => {
  render({
    label: '名前  ',
    type: 'text',
  });
  expect(screen.getByTestId('label-text')).toHaveTextContent('名前');
});

// React Hook Form 対応
const userSchema = z.object({
  name: z.string({ description: '5文字以内で入力してください。' }).max(5),
  age: z.number(),
});

type User = z.infer<typeof userSchema>;

const HFTest = (props: { hasError?: boolean }) => {
  const { control, watch } = useForm<User>({
    mode: 'onBlur',
    resolver: zodResolver(userSchema),
  });
  return (
    <>
      <TextBoxHF
        control={control}
        name="name"
        label="名前"
        message={userSchema.shape.name.description}
        hasError={props.hasError}
      />
      <div data-testid="name-value">{JSON.stringify(watch())}</div>
    </>
  );
};

test('form input', async () => {
  _render(<HFTest />);
  expect(screen.getByTestId('label-text')).toHaveTextContent('名前');
  const input = screen.getByTestId('TextBox');
  expect(input).not.toHaveClass('input-error');
  const message = screen.getByTestId('message');
  expect(message).not.toHaveClass('text-error');
  expect(message).toHaveTextContent('5文字以内で入力してください。');
  fireEvent.change(input, { target: { value: 'test' } });
  expect(screen.getByTestId('name-value')).toHaveTextContent('test');
  fireEvent.change(input, { target: { value: 'test 123' } });
  fireEvent.focusOut(input);
  await waitFor(() => {
    expect(input).toHaveClass('input-error');
    expect(message).toHaveClass('text-error');
  });
});

test('form input - force error', async () => {
  _render(<HFTest hasError />);
  expect(screen.getByTestId('label-text')).toHaveTextContent('名前');
  const input = screen.getByTestId('TextBox');
  expect(input).toHaveClass('input-error');
  const message = screen.getByTestId('message');
  expect(message).toHaveClass('text-error');
  expect(message).toHaveTextContent('5文字以内で入力してください。');
});
