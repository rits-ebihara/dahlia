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
    errorMessage,
    type = 'text',
    labelClassName = '',
    inputClassName = '',
    inputProps = {},
    ...rest
  } = props;

  console.log(inputProps);

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
        {...inputProps}
        data-testid="TextBox"
      />
      <label htmlFor={id} className="dahlia-TextBox label">
        <span className="label-text-alt text-error" data-testid="error-message">
          {errorMessage}
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

  const inputProps = { ...restField, onChange: _onChange };
  console.log(inputProps);
  const _errorMessage = errorMessage || controller.fieldState.error?.message;
  return (
    <TextBox inputProps={inputProps} errorMessage={_errorMessage} {...rest} />
  );
};
