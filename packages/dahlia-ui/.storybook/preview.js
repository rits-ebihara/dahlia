import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'night', value: '#000000' },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story, context) => {
    // const theme = getTheme(context.globals.backgrounds?.value);
    const theme =
      context.parameters.backgrounds.values.find(
        v => v.value === context.globals.backgrounds?.value,
      )?.name || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    return (
      <div data-theme={theme} style={{ padding: '1rem' }}>
        <Story />
        <div id="modal-root"></div>
      </div>
    );
  },
];
