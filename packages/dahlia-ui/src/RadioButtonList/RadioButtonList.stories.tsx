import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { MdAddTask, MdEdit, MdHome } from 'react-icons/md';
import { z } from 'zod';
import { RadioButtonList, RadioButtonListHF } from './RadioButtonList';

export default {
  title: 'commons/RadioButtonList',
  component: RadioButtonList,
} as ComponentMeta<typeof RadioButtonList>;

const Template: ComponentStory<typeof RadioButtonList> = args => (
  <form>
    <RadioButtonList {...args} />
  </form>
);

export const Vertical = Template.bind({});

Vertical.args = {
  name: 'radio',
  value: '1',
  options: [
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
  ],
};

export const Horizontal = Template.bind({});

Horizontal.args = {
  name: 'radio-horizontal',
  value: '1',
  direction: 'horizontal',
  options: [
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
  ],
};

export const ElementLabel = Template.bind({});

ElementLabel.args = {
  name: 'radio',
  value: '1',
  options: [
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
  ],
};

const userTypes = ['admin', 'user', 'guest'] as const;

const useSchema = z.object({
  userType: z.enum(userTypes),
});

type User = z.infer<typeof useSchema>;

export const HookForm = () => {
  /*
    const userTypes = ['admin', 'user', 'guest'] as const;

    const useSchema = z.object({
      userType: z.enum(userTypes),
    });

    type User = z.infer<typeof useSchema>;
  */
  const { control, watch } = useForm<User>({
    defaultValues: {
      userType: 'admin',
    },
  });

  return (
    <form>
      <RadioButtonListHF<User>
        control={control}
        name="userType"
        options={[
          {
            value: 'admin',
            label: 'Admin',
          },
          {
            value: 'user',
            label: 'User',
          },
          {
            value: 'guest',
            label: 'Guest',
          },
        ]}
      />
      <pre>{JSON.stringify(watch(), undefined, 2)}</pre>
    </form>
  );
};
