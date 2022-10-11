import '../src/styles/globals.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  Story => (
    <div data-theme="light" style={{ padding: '1rem' }}>
      <Story />
      <div id="modal-root"></div>
    </div>
  ),
];
