import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "./Carousel";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Carousel> & {
  numOfSlides: number;
};

const meta: Meta<StoryProps> = {
  title: "Molecules/Carousel",
  component: Carousel,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    numOfSlides: 6,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "32px 0" }}>
        <Story />
      </div>
    ),
  ],
  render: ({ numOfSlides, ...args }) => (
    <div className="full-width">
      <Carousel
        {...args}
        slides={Array.from({ length: numOfSlides }, (_, i) => {
          const PHI = (1 + Math.sqrt(5)) / 2;
          const n = i * PHI - Math.floor(i * PHI);
          const hue = Math.floor(n * 256);

          return (
            <div
              style={{
                width: 375,
                height: 500,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: `hsl(${hue},75%,85%)`,
              }}
            >{`Slide ${i + 1}`}</div>
          );
        })}
      />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
