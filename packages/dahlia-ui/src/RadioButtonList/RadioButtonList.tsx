import classNames from 'classnames';
import React, { ChangeEvent, useCallback, useMemo } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { generateUseStyles } from '~/reactUtils';

type Options = { value: string; label: string | JSX.Element }[];

type Props = {
  options: Options;
  value: string;
  name: string;
  direction?: 'horizontal' | 'vertical';
  onChange: (value: Options[number]['value']) => void;
} & JSX.IntrinsicElements['ul'];

const useStyles = generateUseStyles(
  (props: { direction: Props['direction'] }) => ({
    container: classNames(
      'dahlia-radio-button-list',
      'flex',
      { 'flex-col gap-2': props.direction === 'vertical' },
      { 'flex-row gap-4': props.direction === 'horizontal' },
    ),
  }),
);

export const RadioButtonList: React.FC<Props> = props => {
  const {
    options,
    name,
    value,
    className,
    onChange,
    direction = 'vertical',
    ...rest
  } = props;
  const styles = useStyles({ direction });

  const _className = classNames(styles.container, className);

  const onChangeRadio = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      onChange(value);
    },
    [onChange],
  );

  const radioButtons = useMemo(
    () =>
      options.map(option => {
        const checked = option.value === value;
        return (
          <li key={option.value}>
            <label
              data-testid="radio-button-label"
              className="flex items-center gap-1 cursor-pointer"
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                className={classNames('radio', 'radio-sm', {
                  'radio-primary': checked,
                })}
                onChange={onChangeRadio}
                data-testid="radio-button"
              />
              {typeof option.label === 'string' ? (
                <span
                  className={classNames({ 'text-primary font-bold': checked })}
                  data-testid="radio-button-label-text"
                >
                  {option.label}
                </span>
              ) : (
                option.label
              )}
            </label>
          </li>
        );
      }),
    [name, onChangeRadio, options, value],
  );

  return (
    <ul className={_className} {...rest} data-testid="radio-button-container">
      {radioButtons}
    </ul>
  );
};

type HFProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<Props, 'onChange' | 'value' | 'onBlur'>;

export const RadioButtonListHF = <T extends FieldValues>(props: HFProps<T>) => {
  const { name, control, rules, defaultValue, ...rest } = props;

  const { field } = useController({ control, name, rules, defaultValue });

  return <RadioButtonList {...field} {...rest} />;
};
