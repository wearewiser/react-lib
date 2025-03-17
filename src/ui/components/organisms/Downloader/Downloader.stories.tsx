import type { Meta, StoryObj } from "@storybook/react";
import Downloader from "./Downloader";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Downloader> = {
  title: "Organisms/Downloader",
  component: Downloader,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
