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
import { ComponentProps } from 'react';
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
  name: z.string().max(5, '5文字以内で入力してください。'),
  age: z.number(),
});

type User = z.infer<typeof userSchema>;

const HFTest = () => {
  const { control, watch } = useForm<User>({
    mode: 'onBlur',
    resolver: zodResolver(userSchema),
  });
  return (
    <>
      <TextBoxHF control={control} name="name" label="名前" />
      <div data-testid="name-value">{JSON.stringify(watch())}</div>
    </>
  );
};

test('form input', async () => {
  _render(<HFTest />);
  expect(screen.getByTestId('label-text')).toHaveTextContent('名前');
  const input = screen.getByTestId('TextBox');
  fireEvent.change(input, { target: { value: 'test' } });
  expect(screen.getByTestId('name-value')).toHaveTextContent('test');
  fireEvent.change(input, { target: { value: 'test 123' } });
  fireEvent.focusOut(input);
  await waitFor(() => {
    expect(screen.getByTestId('error-message')).toHaveTextContent(
      '5文字以内で入力してください。',
    );
  });
});
