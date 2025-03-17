import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import Logo, { LogoProps } from "./Logo";

describe("Logo", () => {
  it("should render an image ", () => {
    const dummyData: LogoProps = {
      src: "https://wearewiser.com/images/wiser-logo.svg",
    };
    const { getByRole } = render(<Logo {...dummyData} />);
    const imageElement = getByRole("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", dummyData.src);
  });
});