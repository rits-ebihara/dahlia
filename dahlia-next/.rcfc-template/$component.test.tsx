/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render as _render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { $component } from './$component';

const render = (props: ComponentProps<typeof $component>) => {
  return _render(<$component {...props} />);
};

test('renders $component', () => {
  render({});
  expect(screen.getByTestId('container')).toBeInTheDocument();
});
