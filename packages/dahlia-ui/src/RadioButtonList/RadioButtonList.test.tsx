/**
 * @jest-environment jest-environment-jsdom
 */
import '@testing-library/jest-dom';
import { fireEvent, render as _render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { RadioButtonList } from './RadioButtonList';

const render = (props: ComponentProps<typeof RadioButtonList>) => {
  return _render(<RadioButtonList {...props} />);
};

const options1 = [
  {
    value: '1',
    label: 'Option 1',
  },
  {
    value: '2',
    label: 'Option 2',
  },
  {
    value: '3',
    label: 'Option 3',
  },
];

const options2 = [
  {
    value: '1',
    label: <p data-testid="element-label">option 1</p>,
  },
  {
    value: '2',
    label: <p data-testid="element-label">option 2</p>,
  },
  {
    value: '3',
    label: <p data-testid="element-label">option 3</p>,
  },
];

test('renders RadioButtonList', () => {
  render({
    options: options1,
    name: 'radio',
    value: '3',
    onChange: jest.fn(),
  });
  const container = screen.getByTestId('radio-button-container');
  expect(container).toHaveClass('flex-col');
  const options = screen.getAllByTestId('radio-button');
  expect(options).toHaveLength(3);
  expect(options[0]).toHaveAttribute('value', '1');
  expect(options[1]).toHaveAttribute('value', '2');
  expect(options[2]).toHaveAttribute('value', '3');
  expect(options[2]).toBeChecked();
  expect(options[0]).not.toHaveClass('radio-primary');
  expect(options[1]).not.toHaveClass('radio-primary');
  expect(options[2]).toHaveClass('radio-primary');
  const labels = screen.getAllByTestId('radio-button-label-text');
  expect(labels).toHaveLength(3);
  expect(labels[0]).toHaveTextContent('Option 1');
  expect(labels[1]).toHaveTextContent('Option 2');
  expect(labels[2]).toHaveTextContent('Option 3');
  expect(labels[0]).not.toHaveClass('text-primary');
  expect(labels[1]).not.toHaveClass('text-primary');
  expect(labels[2]).toHaveClass('text-primary');
});

test('horizontal renders', () => {
  render({
    options: options1,
    name: 'radio',
    value: '3',
    onChange: jest.fn(),
    direction: 'horizontal',
  });
  const container = screen.getByTestId('radio-button-container');
  expect(container).toHaveClass('flex-row');
});

test('change select', () => {
  const onChange = jest.fn();
  render({
    options: options1,
    name: 'radio',
    value: '3',
    onChange,
  });
  const options = screen.getAllByTestId('radio-button');
  expect(options[2]).toBeChecked();
  expect(options[0]).not.toBeChecked();
  expect(options[1]).not.toBeChecked();
  fireEvent.click(options[0]);
  expect(onChange).toBeCalledWith('1');
});

test('render element label', () => {
  render({
    options: options2,
    name: 'radio',
    value: '3',
    onChange: jest.fn(),
  });
  const textLabels = screen.queryAllByTestId('radio-button-label-text');
  expect(textLabels).toHaveLength(0);
  const labels = screen.getAllByTestId('element-label');
  expect(labels).toHaveLength(3);
});
