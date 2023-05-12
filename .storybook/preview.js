import "styles/globals.css";

export const globalTypes = {
  themes: {
    defaultValue: ["light", "dark"],
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
