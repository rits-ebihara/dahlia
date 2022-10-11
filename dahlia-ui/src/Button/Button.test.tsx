/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render as _render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { Button } from './Button';

const render = (props: ComponentProps<typeof Button>) => {
  return _render(<Button {...props} />);
};

test('renders Button', () => {
  render({});
  expect(screen.getByTestId('container')).toBeInTheDocument();
});
