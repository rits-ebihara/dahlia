import { ComponentMeta, ComponentStory } from '@storybook/react';
import { $component } from './$component';

export default {
  title: '$path',
  component: $component,
} as ComponentMeta<typeof $component>;

const Template: ComponentStory<typeof $component> = args => (
  <$component {...args} />
);

export const Default = Template.bind({});

Default.args = {};
