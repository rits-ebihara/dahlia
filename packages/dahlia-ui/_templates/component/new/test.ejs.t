---
to: src/components/<%= path %>/<%= Name %>/<%= Name %>.test.tsx
---
<%
  const Name = h.changeCase.pascal(name);
%>
/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render as _render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { <%= Name %> } from './<%= Name %>';

const render = (props: ComponentProps<typeof <%= Name %>>) => {
  return _render(<<%= Name %> {...props} />);
};

test('renders', () => {
  render({});
  expect(screen.getByTestId('<%= Name %>container')).toBeInTheDocument();
});
