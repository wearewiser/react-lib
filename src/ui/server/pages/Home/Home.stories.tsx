import type { Meta, StoryObj } from "@storybook/react";
import Home from "./Home";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Home> = {
  title: "Pages/Home",
  component: Home,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
