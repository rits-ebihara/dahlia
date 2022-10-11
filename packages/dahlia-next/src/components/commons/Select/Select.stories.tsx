import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Select, SelectHF } from './Select';

export default {
  title: 'commons/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = args => <Select {...args} />;

const options = [
  { value: '001', label: 'option 001' },
  { value: '002', label: 'option 002' },
  { value: '003', label: 'option 003' },
];

export const Default = Template.bind({});

Default.args = {
  options,
  value: '002',
  selectClassName: 'select-bordered',
  label: 'オプション',
};

export const PrimarySmall = Template.bind({});

PrimarySmall.args = {
  options,
  value: '002',
  selectClassName: 'select-sm select-primary select-bordered',
  label: 'オプション',
};

export const AddNoneSelectOptions = Template.bind({});

AddNoneSelectOptions.args = {
  options,
  value: '002',
  selectClassName: 'select-sm select-primary select-bordered',
  label: 'オプション',
  noneSelectOptions: { value: '', label: '選択してください' },
};

const optionValues = ['000', '001', '002'] as const;

const userSchema = z.object({
  option: z.enum(optionValues),
});

type User = z.infer<typeof userSchema>;

export const HookForm = () => {
  // const optionValues = ['000', '001', '002'] as const;
  // const userSchema = z.object({
  //   option: z.enum(optionValues),
  // });
  // type User = z.infer<typeof userSchema>;

  const { control, watch } = useForm<User>({
    defaultValues: { option: '000' },
  });
  return (
    <div>
      <SelectHF
        control={control}
        label="オプション"
        name="option"
        selectClassName="select-sm select-bordered"
        options={[
          {
            value: '000',
            label: 'option 000',
          },
          {
            value: '001',
            label: 'option 001',
          },
          {
            value: '002',
            label: 'option 002',
          },
        ]}
      />
      <pre>{JSON.stringify(watch(), undefined, 2)}</pre>
    </div>
  );
};
