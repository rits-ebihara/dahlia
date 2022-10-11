/**
 * @jest-environment jest-environment-jsdom
 */
import '@testing-library/jest-dom';
import { fireEvent, render as _render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { Select } from './Select';

const render = (props: ComponentProps<typeof Select>) => {
  return _render(<Select {...props} />);
};

const options = [
  { value: '001', label: 'option 001' },
  { value: '002', label: 'option 002' },
  { value: '003', label: 'option 003' },
];

test('renders Select', () => {
  render({
    options,
    value: '002',
    label: 'select',
    onChange: jest.fn(),
  });
  expect(screen.getByTestId('select-container')).toBeInTheDocument();
  const optionElements = screen.getAllByTestId('select-option');
  expect(optionElements).toHaveLength(3);
  const selectElement = screen.getByTestId('select');
  expect(selectElement).toHaveValue('002');
});

test('renders Select', () => {
  render({
    options,
    value: '002',
    label: 'select',
    onChange: jest.fn(),
    noneSelectOptions: { value: '', label: '選択してください' },
  });
  expect(screen.getByTestId('select-container')).toBeInTheDocument();
  const optionElements = screen.getAllByTestId('select-option');
  expect(optionElements).toHaveLength(4);
  expect(optionElements[0]).toHaveAttribute('value', '');
  expect(optionElements[0]).toHaveTextContent('選択してください');
});

test('events Select', () => {
  const onChange = jest.fn();
  render({
    options,
    value: '002',
    label: 'select',
    onChange,
  });
  const selectElement = screen.getByTestId('select');
  fireEvent.change(selectElement, { target: { value: '003' } });
  expect(onChange).toBeCalledWith('003');
});
