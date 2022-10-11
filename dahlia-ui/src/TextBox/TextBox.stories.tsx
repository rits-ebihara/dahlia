import { zodResolver } from '@hookform/resolvers/zod';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TextBox, TextBoxHF } from './TextBox';

export default {
  title: 'commons/TextBox',
  component: TextBox,
} as ComponentMeta<typeof TextBox>;

const Template: ComponentStory<typeof TextBox> = args => <TextBox {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: 'ラベル',
  type: 'text',
  inputClassName: 'input-bordered',
};

export const PrimarySlime = Template.bind({});

PrimarySlime.args = {
  label: 'ラベル',
  type: 'text',
  inputClassName: 'input-bordered input-sm input-primary',
};

export const Error = Template.bind({});

Error.args = {
  label: 'ラベル',
  type: 'text',
  inputClassName: 'input-bordered',
  errorMessage: '必須です。',
};

const userSchema = z.object({
  name: z.string().max(5, '5文字以内で入力してください。'),
  age: z.number().min(10).max(120, '年齢は10〜120歳の範囲で入力してください。'),
});

type User = z.infer<typeof userSchema>;

export const HookForm = () => {
  // const userSchema = z.object({
  //   name: z.string().max(5, '5文字以内で入力してください。'),
  //   age: z.number().min(10).max(120, '年齢は10〜120歳の範囲で入力してください。'),
  // });
  // type User = z.infer<typeof userSchema>;
  const { control, watch } = useForm<User>({
    mode: 'onBlur',
    resolver: zodResolver(userSchema),
  });
  return (
    <div className="flex flex-col gap-2">
      <p>
        <TextBoxHF
          control={control}
          inputClassName="input-bordered"
          name="name"
          label="名前"
        />
      </p>
      <p>
        <TextBoxHF
          control={control}
          inputClassName="input-bordered w-24 text-right"
          type="number"
          name="age"
          label="年齢"
        />
      </p>
      <div data-testid="name-value">
        <p>User Object</p>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </div>
    </div>
  );
};
