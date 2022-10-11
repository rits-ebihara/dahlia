import classNames from 'classnames';
import React, { useCallback } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { generateUseStyles } from '~/reactUtils';

type Props = {
  options: { value: string; label: string | JSX.Element }[];
  direction?: 'horizontal' | 'vertical';
  value: string[];
  onChange: (value: string[]) => void;
} & JSX.IntrinsicElements['ul'];

const useStyles = generateUseStyles(
  (props: { direction: Props['direction'] }) => ({
    container: classNames(
      'flex',
      { 'flex-col gap-2': props.direction === 'vertical' },
      { 'flex-row gap-4': props.direction === 'horizontal' },
    ),
    label: classNames(
      'group',
      'flex',
      'items-center',
      'gap-1',
      'cursor-pointer',
    ),
    checkbox: classNames(
      'peer',
      'checkbox',
      'checkbox-sm',
      'checked:checkbox-primary',
    ),
    labelText: classNames(
      'peer-checked:text-primary',
      'peer-checked:font-bold',
    ),
  }),
);

export const CheckboxList: React.FC<Props> = props => {
  const {
    options,
    value: values,
    onChange,
    className,
    direction = 'vertical',
  } = props;
  const styles = useStyles({ direction });
  const _className = classNames(styles.container, className);

  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const nextValues = values.includes(value)
        ? values.filter(v => v !== value)
        : [...values, value];
      onChange(nextValues);
    },
    [onChange, values],
  );

  const checkboxes = options.map(option => {
    const checked = values.includes(option.value);
    return (
      <li key={option.value}>
        <label className={styles.label}>
          <input
            type="checkbox"
            value={option.value}
            checked={checked}
            className={styles.checkbox}
            onChange={_onChange}
            data-testid="checkbox"
          />
          {typeof option.label === 'string' ? (
            <span className={styles.labelText} data-testid="label-text">
              {option.label}
            </span>
          ) : (
            option.label
          )}
        </label>
      </li>
    );
  }, []);

  return (
    <ul className={_className} data-testid="checkbox-container">
      {checkboxes}
    </ul>
  );
};

type HFProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<Props, 'onChange' | 'value' | 'onBlur'>;

export const CheckboxListHF = <T extends FieldValues>(props: HFProps<T>) => {
  const { name, control, rules, defaultValue, ...rest } = props;
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue,
  });
  return <CheckboxList {...rest} {...field} />;
};
