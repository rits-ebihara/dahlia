import classNames from 'classnames';
import React, { ChangeEvent, useCallback, useId } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

type Props = {
  label: string | JSX.Element;
  message?: string | JSX.Element;
  hasError?: boolean;
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
  labelClassName?: string;
  inputClassName?: string;
  inputProps?: Pick<
    JSX.IntrinsicElements['input'],
    'ref' | 'onChange' | 'onBlur' | 'name' | 'value'
  >;
} & JSX.IntrinsicElements['div'];

export const TextBox: React.FC<Props> = props => {
  const {
    label,
    message,
    type = 'text',
    labelClassName = '',
    inputClassName = '',
    inputProps = {},
    hasError = false,
    ...rest
  } = props;

  console.log(inputProps);

  const id = useId();

  const _inputClassName = classNames(
    'input',
    { 'input-error': hasError },
    inputClassName,
  );

  const _labelClassName = classNames('dahlia', 'label', labelClassName);
  const _messageClassName = classNames('dahlia', 'label-text-alt', {
    'text-error': hasError,
  });

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
        {...inputProps}
        data-testid="TextBox"
      />
      <label htmlFor={id} className="dahlia-TextBox label">
        <span className={_messageClassName} data-testid="message">
          {message}
        </span>
      </label>
    </div>
  );
};

type HFProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<Props, 'name'>;

export const TextBoxHF = <T extends FieldValues>(props: HFProps<T>) => {
  const {
    control,
    name,
    rules,
    shouldUnregister,
    defaultValue,
    message,
    hasError,
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

  const inputProps = { ...restField, onChange: _onChange };
  const _hasError =
    hasError === undefined ? !!controller.fieldState.error : hasError;
  return (
    <TextBox
      inputProps={inputProps}
      message={message}
      hasError={_hasError}
      {...rest}
    />
  );
};
