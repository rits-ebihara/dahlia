---
to: src/components/<%= path %>/<%= Name %>/<%= Name %>.stories.tsx
---
<%
  const Name = h.changeCase.pascal(name);
%>
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { <%= Name %> } from './<%= Name %>';

export default {
  title: '<%= Name %>',
  component: <%= Name %>,
} as ComponentMeta<typeof <%= Name %>>;

const Template: ComponentStory<typeof <%= Name %>> = args => (
  <<%= Name %> {...args} />
);

export const Default = Template.bind({});

Default.args = {};
