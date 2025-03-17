import type { Meta, StoryObj } from "@storybook/react";
import Logo from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "Molecules/Logo",
  component: Logo,
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "object",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    src: "https://wearewiser.com/images/wiser-logo.svg",
  },
};
