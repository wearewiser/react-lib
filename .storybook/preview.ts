import type { Preview } from "@storybook/react";

import "@/styles/globals.scss";

const preview: Preview = {
  // default auto-generation of docs: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    docs: {
      toc: true, // 👈 Enables the table of contents
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    initialGlobals: {
      // 👇 Set the initial background color
      backgrounds: { value: "light" },
    },
  },
};

export default preview;
