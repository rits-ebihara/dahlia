import React from 'react';
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

export const PrimarySmall = Template.bind({});

PrimarySmall.args = {
  label: 'ラベル',
  type: 'text',
  inputClassName: 'input-bordered input-sm input-primary',
};

export const Error = Template.bind({});

Error.args = {
  label: 'ラベル',
  type: 'text',
  inputClassName: 'input-bordered',
  message: '必須です。',
  hasError: true,
};

const userSchema = z.object({
  name: z.string({ description: '1-5文字で入力してください。' }).min(1).max(5),
  age: z
    .number({ description: '年齢は10〜120歳の範囲で入力してください。' })
    .min(10)
    .max(120),
});

type User = z.infer<typeof userSchema>;

export const HookForm = () => {
  // const userSchema = z.object({
  //   name: z.string({ description: '1-5文字で入力してください。' }).min(1).max(5),
  //   age: z
  //     .number({ description: '年齢は10〜120歳の範囲で入力してください。' })
  //     .min(10)
  //     .max(120),
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
          message={userSchema.shape.name.description}
        />
      </p>
      <p>
        <TextBoxHF
          control={control}
          inputClassName="input-bordered w-20 text-right"
          type="number"
          name="age"
          label="年齢"
          message={userSchema.shape.age.description}
        />
      </p>
      <div data-testid="name-value">
        <p>User Object</p>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </div>
    </div>
  );
};
