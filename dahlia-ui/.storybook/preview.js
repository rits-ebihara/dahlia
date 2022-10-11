import "../src/index.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const getTheme = (hexColor) => {
  if (!hexColor) return "light";
  // 指定した色からR/G/Bをそれぞれ取得
  const red = parseInt(hexColor.substr(1, 2), 16);
  const green = parseInt(hexColor.substr(3, 2), 16);
  const blue = parseInt(hexColor.substr(5, 2), 16);

  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  const luminance = brightness / 2.55;

  return luminance > 50 ? "dark" : "night";
};

export const decorators = [
  (Story, context) => {
    console.log(context.globals);
    const theme = getTheme(context.globals.backgrounds?.value);

    return (
      <div data-theme={theme} style={{ padding: "1rem" }}>
        <Story />
        <div id="modal-root"></div>
      </div>
    );
  },
];
