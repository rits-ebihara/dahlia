import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { MdAddTask, MdEdit, MdHome } from 'react-icons/md';
import { z } from 'zod';
import { CheckboxList, CheckboxListHF } from './CheckboxList';

export default {
  title: 'commons/CheckboxList',
  component: CheckboxList,
} as ComponentMeta<typeof CheckboxList>;

const Template: ComponentStory<typeof CheckboxList> = args => (
  <form>
    <CheckboxList {...args} />
  </form>
);

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
    label: (
      <span className="flex gap-1 items-center">
        <MdHome />
        Home
      </span>
    ),
  },
  {
    value: '2',
    label: (
      <span className="flex gap-1 items-center">
        <MdEdit />
        Edit
      </span>
    ),
  },
  {
    value: '3',
    label: (
      <span className="flex gap-1 items-center">
        <MdAddTask />
        Add Task
      </span>
    ),
  },
];

export const Default = Template.bind({});

Default.args = {
  options: options1,
  value: ['1', '3'],
};

export const Horizontal = Template.bind({});

Horizontal.args = {
  options: options1,
  value: ['1', '3'],
  direction: 'horizontal',
};

export const ElementLabel = Template.bind({});

ElementLabel.args = {
  options: options2,
  value: [],
};

const userSchema = z.object({
  selectValues: z.array(z.string()),
});

type User = z.infer<typeof userSchema>;

export const HookForm = () => {
  /**
    const userSchema = z.object({
      selectValues: z.array(z.string()),
    });

    type User = z.infer<typeof userSchema>;
   */
  const { control, watch } = useForm<User>({
    defaultValues: { selectValues: [] },
  });
  return (
    <form>
      <CheckboxListHF
        name="selectValues"
        control={control}
        options={options1}
      />
      <pre>{JSON.stringify(watch())}</pre>
    </form>
  );
};
