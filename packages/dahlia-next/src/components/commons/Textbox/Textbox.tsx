import classNames from 'classnames';
import React, { ChangeEvent, useCallback, useId } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

type Props = {
  label: string | JSX.Element;
  errorMessage?: string | JSX.Element;
  type?:
    | 'text'
    | 'number'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'password'
    | 'search'
    | 'tel'
    | 'time'
    | 'url'
    | 'week';
  inputClassName?: string;
  labelClassName?: string;
} & Omit<JSX.IntrinsicElements['div'], 'id | type'>;

export const Textbox: React.FC<Props> = props => {
  const {
    label,
    errorMessage,
    type = 'text',
    inputClassName = '',
    labelClassName = '',
    ...rest
  } = props;

  const id = useId();

  const _inputClassName = classNames(
    'input',
    { 'input-error': errorMessage },
    inputClassName,
  );

  const _labelClassName = classNames('dahlia', 'label', labelClassName);

  return (
    <div {...rest}>
      <label htmlFor={id} className={_labelClassName}>
        <span className="label-text" data-testid="label-text">
          {label}
        </span>
      </label>
      <input
        id={id}
        type={type}
        className={_inputClassName}
        data-testid="textbox"
      />
      <label htmlFor={id} className="dahlia-textbox label">
        <span className="label-text-alt text-error" data-testid="error-message">
          {errorMessage}
        </span>
      </label>
    </div>
  );
};

type HFProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<Props, 'name'>;

export const TextboxHF = <T extends FieldValues>(props: HFProps<T>) => {
  const {
    control,
    name,
    rules,
    shouldUnregister,
    defaultValue,
    errorMessage,
    ...rest
  } = props;
  const controller = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });
  const { onChange, ...restField } = controller.field;
  const _onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (rest.type === 'number') {
        onChange(Number(e.target.value) || null);
      } else {
        onChange(e.target.value);
      }
    },
    [onChange, rest.type],
  );

  const _errorMessage = errorMessage || controller.fieldState.error?.message;
  return (
    <Textbox
      {...restField}
      onChange={_onChange}
      errorMessage={_errorMessage}
      {...rest}
    />
  );
};
