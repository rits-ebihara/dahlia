import classNames from 'classnames';
import React, { ChangeEvent, useCallback, useId, useMemo } from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  useController,
  UseControllerProps,
} from 'react-hook-form';

type Props = {
  options: { value: string; label: string }[];
  value: string;
  label: string;
  selectClassName?: string;
  onChange: (value: string) => void;
  noneSelectOptions?: { value: string; label: string };
} & JSX.IntrinsicElements['div'];

export const Select: React.FC<Props> = props => {
  const {
    options,
    value,
    label,
    selectClassName,
    onChange,
    noneSelectOptions,
    ...rest
  } = props;

  const _selectClassName = classNames('select', selectClassName);
  const id = useId();

  const _onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      onChange(value);
    },
    [onChange],
  );

  const optionElements = useMemo(() => {
    const _options = [...options];
    if (noneSelectOptions) {
      _options.unshift(noneSelectOptions);
    }
    return _options.map(option => {
      return (
        <option
          key={option.value}
          value={option.value}
          data-testid="select-option"
        >
          {option.label}
        </option>
      );
    });
  }, [noneSelectOptions, options]);

  return (
    <div data-testid="select-container" {...rest}>
      <label htmlFor={id} className="dahlia label">
        <span className="label-text">{label}</span>
      </label>
      <select
        id={id}
        value={value}
        className={_selectClassName}
        onChange={_onChange}
        data-testid="select"
      >
        {optionElements}
      </select>
    </div>
  );
};

type HFProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<Props, keyof ControllerRenderProps<FieldValues, Path<T>>>;

export const SelectHF = <T extends FieldValues>(props: HFProps<T>) => {
  const { control, name, rules, shouldUnregister, defaultValue, ...rest } =
    props;
  const { field } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return <Select {...rest} {...field} />;
};
