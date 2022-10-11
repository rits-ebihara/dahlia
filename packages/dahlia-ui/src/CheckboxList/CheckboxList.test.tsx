/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { fireEvent, render as _render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { CheckboxList } from './CheckboxList';

const render = (props: ComponentProps<typeof CheckboxList>) => {
  return _render(<CheckboxList {...props} />);
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

test('renders CheckboxList', () => {
  render({
    options: options1,
    value: ['1', '3'],
    onChange: jest.fn(),
  });
  const container = screen.getByTestId('checkbox-container');
  expect(container).toHaveClass('flex-col');
  const options = screen.getAllByTestId('checkbox');
  expect(options).toHaveLength(3);
  expect(options[0]).toHaveAttribute('value', '1');
  expect(options[1]).toHaveAttribute('value', '2');
  expect(options[2]).toHaveAttribute('value', '3');
  expect(options[0]).toBeChecked();
  expect(options[1]).not.toBeChecked();
  expect(options[2]).toBeChecked();

  const labelTexts = screen.getAllByTestId('label-text');
  expect(labelTexts).toHaveLength(3);
  expect(labelTexts[0]).toHaveTextContent('Option 1');
  expect(labelTexts[1]).toHaveTextContent('Option 2');
  expect(labelTexts[2]).toHaveTextContent('Option 3');
});

test('renders CheckboxList', () => {
  const onChange = jest.fn();
  render({
    options: options1,
    direction: 'horizontal',
    value: [],
    onChange,
  });
  const container = screen.getByTestId('checkbox-container');
  expect(container).toHaveClass('flex-row');
});

test('element renders', () => {
  const onChange = jest.fn();
  render({
    options: options2,
    value: [],
    onChange,
  });
  const labelText = screen.queryAllByTestId('label-text');
  expect(labelText).toHaveLength(0);
  const elementalLabel = screen.getAllByTestId('element-label');
  expect(elementalLabel).toHaveLength(3);
});

test('element renders', () => {
  const onChange = jest.fn();
  render({
    options: options1,
    value: ['1'],
    onChange,
  });
  const checkboxes = screen.getAllByTestId('checkbox');
  fireEvent.click(checkboxes[1]);
  expect(onChange).toBeCalledWith(['1', '2']);
  onChange.mockClear();
  fireEvent.click(checkboxes[0]);
  // values を変更しているわけではないので、空配列で正解。
  expect(onChange).toBeCalledWith([]);
});
